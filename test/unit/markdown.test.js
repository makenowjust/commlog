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
  t.deepEqual(markdown.parse('hello').tree, {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value: 'hello',
            position: {
              start: {line: 1, column: 1, offset: 0},
              end: {line: 1, column: 6, offset: 5},
            },
          },
        ],
        position: {
          start: {line: 1, column: 1, offset: 0},
          end: {line: 1, column: 6, offset: 5},
        },
      },
    ],
    position: {
      start: {line: 1, column: 1, offset: 0},
      end: {line: 1, column: 6, offset: 5},
    },
  });
});
