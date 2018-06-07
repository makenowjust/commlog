import test from 'ava';

import * as path from 'path';

import {Nuxt, Builder} from 'nuxt-edge';
import puppeteer from 'puppeteer';
import delay from 'delay';

import config from '../../nuxt.config';

const onFull = test => (process.env.TEST_MODE !== 'full' ? test.skip : test);

// Set up:

// Global instances to close after tests.
let nuxt = null;
let browser = null;
let page = null;

onFull(test.before)(async () => {
  const rootDir = path.resolve(__dirname, '../..');
  const plugins = config.plugins
    .filter(plugin => plugin !== '~/plugins/test-directive')
    .concat(path.join(__dirname, '../_test-directive.js'))
    .concat(path.join(__dirname, '../_axios-mock.js'));
  nuxt = new Nuxt({
    ...config,
    dev: false,
    plugins,
    rootDir,
  });
  await new Builder(nuxt).build();
  await nuxt.listen(4000, 'localhost');

  browser = await puppeteer.launch({args: ['--no-sandbox']});
  page = await browser.newPage();
});

onFull(test.beforeEach)(async () => {
  await page.goto('about:blank');
});

onFull(test.after)(async () => {
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
  wait(() => document.title, s => s !== 'commlog' && s !== title && !s.startsWith('loading... |'));

const getCommitCount = () =>
  page.evaluate(
    () => document.querySelectorAll('[data-test~="commit"]').length,
  );

// Test:

onFull(test)('open top page', async t => {
  let title = await page.evaluate(() => document.title);

  // Open top page:
  await page.goto('http://localhost:4000/commlog/');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  let articles = await getCommitCount();
  t.is(articles, 30);

  // Click "load more":
  await page.click('[data-test="load-more"]');
  await wait(() => !!document.querySelector('[data-test="loading"]'), loading => !loading);

  articles = await getCommitCount();
  t.is(articles, 60);

  // Go to first article:
  await page.click('[data-test~="commit-048ebce"] [data-test="commit-link"]');
  title = await onChangeTitle(title);
  t.is(title, '#048ebce WindowsのインストールUSBを焼く場合 | commlog commit');

  const h1 = await page.evaluate(
    () => document.querySelector('[data-test~="commit"] [data-test="commit-body"] h1').textContent,
  );
  t.is(h1, 'WindowsのインストールUSBを焼く場合');

  // Back to top page:
  await page.click('[data-test="top-link"]');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  // Keep loaded cmmits:
  articles = await getCommitCount();
  t.is(articles, 60);
});

onFull(test)('open single commit page', async t => {
  let title = await page.evaluate(() => document.title);

  // Open single commit page:
  await page.goto('http://localhost:4000/commlog/commit/048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d');
  title = await onChangeTitle(title);
  t.is(title, '#048ebce WindowsのインストールUSBを焼く場合 | commlog commit');

  const h1 = await page.evaluate(
    () => document.querySelector('[data-test~="commit"] [data-test="commit-body"] h1').textContent,
  );
  t.is(h1, 'WindowsのインストールUSBを焼く場合');

  // Back to top page:
  await page.click('[data-test="top-link"]');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  const articles = await getCommitCount();
  t.is(articles, 30);
});

onFull(test)('open search page', async t => {
  let title = await page.evaluate(() => document.title);

  // Open top page:
  await page.goto('http://localhost:4000/commlog/');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  // Seacrh 'hello':
  await page.focus('[data-test="search"]');
  await page.keyboard.type('hello');
  await page.keyboard.press('Enter');

  title = await onChangeTitle(title);
  t.is(title, 'hello | commlog search');

  // Found 1 commit:
  const articles = await getCommitCount();
  t.is(articles, 1);

  const hasNext = await page.evaluate(() => !!document.querySelector('[data-test="load-more"]'));
  t.is(hasNext, false);
});
