import test from 'ava';

import * as markdown from '../../lib/markdown';

test('extract title from raw paragraph', t => {
  t.is(markdown.parse('hello').title, 'hello');
});

test('extract title from heading', t => {
  t.is(markdown.parse('# hello').title, 'hello');
});

test('extract title from heading with markup', t => {
  t.is(markdown.parse('# *hello* __world__').title, 'hello world');
});

test('parse as HAST tree', t => {
  t.snapshot(markdown.parse('hello').tree);
});

test('convert from HAST tree', t => {
  const createElement = (tagName, data, children) => ({tagName, data, children});
  const {tree} = markdown.parse('hello');
  t.snapshot(markdown.convert(createElement, tree));
});
