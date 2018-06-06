import test from 'ava';

import * as path from 'path';

import {Nuxt, Builder} from 'nuxt-edge';
import puppeteer from 'puppeteer';
import delay from 'delay';

import config from '../../nuxt.config';

// Set up:

// Global instances to close after tests.
let nuxt = null;
let browser = null;
let page = null;

test.before(async () => {
  const rootDir = path.resolve(__dirname, '../..');
  nuxt = new Nuxt({
    ...config,
    plugins: config.plugins.concat(path.join(__dirname, '../_mock.js')),
    dev: false,
    rootDir,
  });
  await new Builder(nuxt).build();
  await nuxt.listen(4000, 'localhost');

  browser = await puppeteer.launch({args: ['--no-sandbox']});
  page = await browser.newPage();
});

test.beforeEach(async () => {
  await page.goto('about:blank');
});

test.after(async () => {
  await page.close();
  await browser.close();
  await nuxt.close();
});

// Utility:

const TIMEOUT = 10;
const DELAY = 1000;

const wait = async (expr, cond) => {
  let value = null;
  let i = 0;
  for (i = 0; i < TIMEOUT; i++) {
    value = await page.evaluate(expr);
    if (cond(value)) {
      break;
    }
    await delay(DELAY);
  }

  if (i >= TIMEOUT) {
    throw new Error('timeout');
  }

  return value;
};

const onChangeTitle = title =>
  wait(
    () => document.title,
    s => s !== 'commlog' && s !== title && !s.startsWith('loading... |'),
  );

// Test:

test('open top page', async t => {
  let title = await page.evaluate(() => document.title);

  // Open top page:
  await page.goto('http://localhost:4000/commlog/');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  let articles = await page.evaluate(
    () => document.querySelectorAll('main > div > article').length,
  );
  t.is(articles, 30);

  // Click "load more":
  await page.click('main > div > div > section');
  await wait(
    () => !document.querySelector('main > div > div > section'),
    loading => loading,
  );

  articles = await page.evaluate(
    () => document.querySelectorAll('main > div > article').length,
  );
  t.is(articles, 60);

  // Go to first article:
  await page.click(
    'main > div > article:first-child > section:last-child > a:last-child',
  );
  title = await onChangeTitle(title);
  t.is(title, '#048ebce WindowsのインストールUSBを焼く場合 | commlog commit');

  // Back to top page:
  await page.click('header > h1 > a');
  title = await wait(
    () => document.title,
    s => s !== 'commlog' && s !== title && !s.startsWith('loading... |'),
  );
  t.is(title, 'commlog top');

  articles = await page.evaluate(
    () => document.querySelectorAll('main > div > article').length,
  );
  t.is(articles, 60);
});

test('open single commit page', async t => {
  let title = await page.evaluate(() => document.title);

  // Open single commit page:
  await page.goto(
    'http://localhost:4000/commlog/commit/048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d',
  );
  title = await onChangeTitle(title);
  t.is(title, '#048ebce WindowsのインストールUSBを焼く場合 | commlog commit');

  // Back to top page:
  await page.click('header > h1 > a');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  const articles = await page.evaluate(
    () => document.querySelectorAll('main > div > article').length,
  );
  t.is(articles, 30);
});

test('open search page', async t => {
  let title = await page.evaluate(() => document.title);

  await page.goto('http://localhost:4000/commlog/');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  await page.focus('header > section > input');
  await page.keyboard.type('hello');
  await page.keyboard.press('Enter');
  title = await onChangeTitle(title);
  t.is(title, 'hello | commlog search');

  const articles = await page.evaluate(
    () => document.querySelectorAll('main > div > article').length,
  );
  t.is(articles, 1);

  const hasNext = await page.evaluate(
    () => !!document.querySelector('main > div > div > section'),
  );
  t.is(hasNext, false);
});
