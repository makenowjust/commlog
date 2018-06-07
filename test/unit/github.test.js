import test from 'ava';

import {convertCommit, convertPage} from '../../lib/github';

import COMMIT from '../fixtures/commit.json';
import COMMITS from '../fixtures/commits1.json';
import SEARCH from '../fixtures/search.json';

test('convert commit', t => {
  const commit = convertCommit(COMMIT);
  t.is(commit.hash, '048ebceb14ff5367ad8ff9a8a64f920b5a3f9c6d');
  t.deepEqual(commit.author, {
    github: true,
    name: 'MakeNowJust',
    email: 'make.just.on@gmail.com',
    icon: 'https://avatars3.githubusercontent.com/u/6679325?v=4',
  });
  t.deepEqual(commit.date, new Date('2018-06-06T03:27:49Z'));
  t.is(commit.title, 'WindowsのインストールUSBを焼く場合');
});

test('convert commit having no GitHub author', t => {
  const commit = convertCommit({...COMMIT, author: null});
  t.deepEqual(commit.author, {
    github: false,
    name: 'TSUYUSATO Kitsune',
    email: 'make.just.on@gmail.com',
    icon: null,
  });
});

test('convert commits result to page', t => {
  const {commits, hashes, next} = convertPage(COMMITS);
  t.is(commits.length, 30);
  t.is(hashes.length, 30);
  t.deepEqual(next, 'https://api.github.com/repositories/42772934/commits?page=2');
});

test('convert search result to page', t => {
  const {commits, hashes, next} = convertPage(SEARCH);
  t.is(commits.length, 1);
  t.is(hashes.length, 1);
  t.is(commits[0].title, 'jo');
  t.is(next, null);
});
