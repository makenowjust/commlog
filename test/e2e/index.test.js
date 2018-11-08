import * as path from 'path';

import {Nuxt} from 'nuxt';
import delay from 'delay';
import puppeteer from 'puppeteer';
import test from 'ava';

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
    dev: false,
    rootDir,
  });
  // NOTE: run `nuxt build` is needed before this.
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
  /* eslint-disable no-await-in-loop */
  for (i = 0; i < TIMEOUT; i++) {
    value = await page.evaluate(expr);
    if (cond(value)) {
      break;
    }
    await delay(DELAY);
  }
  /* eslint-enable */

  if (i >= TIMEOUT) {
    throw new Error('timeout');
  }

  return value;
};

const onChangeTitle = title =>
  wait(() => document.title, s => s !== 'commlog' && s !== title && !s.startsWith('loading... |'));

const getCommitCount = () =>
  page.evaluate(() => document.querySelectorAll('[data-test~="commit"]').length);

// Test:

test.serial('open top page', async t => {
  let title = await page.evaluate(() => document.title);

  // Open top page:
  await page.goto('http://localhost:4000/');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  let articles = await getCommitCount();
  t.is(articles, 30);

  // Click "load more":
  await page.click('[data-test="load-more"]');
  await wait(() => Boolean(document.querySelector('[data-test="loading"]')), loading => !loading);

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

test.serial('open single commit page', async t => {
  let title = await page.evaluate(() => document.title);

  // Open single commit page:
  await page.goto('http://localhost:4000/commit/048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d');
  title = await onChangeTitle(title);
  t.is(title, '#048ebce WindowsのインストールUSBを焼く場合 | commlog commit');

  const h1 = await page.evaluate(
    () => document.querySelector('[data-test~="commit"] [data-test="commit-body"] h1').textContent,
  );
  t.is(h1, 'WindowsのインストールUSBを焼く場合');

  const external = await page.evaluate(
    () => document.querySelector('[data-test~="commit"] [data-test="commit-external-link"]').href,
  );
  t.is(
    external,
    'https://github.com/MakeNowJust/commlog/commit/048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d',
  );

  // Back to top page:
  await page.click('[data-test="top-link"]');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  const articles = await getCommitCount();
  t.is(articles, 30);
});

test.serial('open single commit page (footnote)', async t => {
  let title = await page.evaluate(() => document.title);

  // Open single commit page (footnote):
  await page.goto('http://localhost:4000/commit/536bd0322ebc5f218208d52830efb5ba7110213e');
  title = await onChangeTitle(title);
  t.is(title, '#536bd03 footnoteのテスト | commlog commit');

  const h1 = await page.evaluate(
    () => document.querySelector('[data-test~="commit"] [data-test="commit-body"] h1').textContent,
  );
  t.is(h1, 'footnoteのテスト');

  // Check footnote reference:
  const footnoteRef = await page.evaluate(
    () =>
      document.querySelector('#\\35 36bd0322ebc5f218208d52830efb5ba7110213e-fnref-hope > a').hash,
  );
  t.is(footnoteRef, '#536bd0322ebc5f218208d52830efb5ba7110213e-fn-hope');
});

test.serial('open search page', async t => {
  let title = await page.evaluate(() => document.title);

  // Open top page:
  await page.goto('http://localhost:4000/');
  title = await onChangeTitle(title);
  t.is(title, 'commlog top');

  // Can't search without query:
  await page.focus('[data-test="search"]');
  await page.keyboard.press('Enter');
  // TODO: It is unsafe... How is proper way to check "can't search without query"?
  await delay(500);
  const url = await page.evaluate(() => location.href);
  t.is(url, 'http://localhost:4000/');

  // Seacrh 'hello':
  await page.focus('[data-test="search"]');
  await page.keyboard.type('hello');
  await page.keyboard.press('Enter');

  title = await onChangeTitle(title);
  t.is(title, 'hello | commlog search');

  // Found 1 commit:
  const articles = await getCommitCount();
  t.is(articles, 1);

  const hasNext = await page.evaluate(() =>
    Boolean(document.querySelector('[data-test="load-more"]')),
  );
  t.is(hasNext, false);
});
