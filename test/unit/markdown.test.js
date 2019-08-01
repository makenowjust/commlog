import test from 'ava';

import * as markdown from '../../lib/markdown';

const createElement = (tagName, data, children) =>
  // Add dummy property 'context' to cheat hast-to-hyperscript.
  Object.defineProperty({tagName, data, children}, 'context', {
    enumerable: false,
    value: {_isVue: true},
  });

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
  const {tree} = markdown.parse('hello');
  t.snapshot(markdown.convert(createElement, tree, 'hash'));
});

test('convert footnote from HAST tree', t => {
  const {tree} = markdown.parse(`
[^foo]

[^foo]: bar
`);
  t.snapshot(markdown.convert(createElement, tree, 'hash'));
});
