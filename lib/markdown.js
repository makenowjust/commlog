import toH from 'hast-to-hyperscript';
import highlight from 'rehype-highlight';
import is from 'unist-util-is';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import breaks from 'remark-breaks';
import footnotes from 'remark-footnotes';
import toString from 'mdast-util-to-string';
import unified from 'unified';

const title = function () {
  return (root, file) => {
    let node = root.children[0];
    if (is(node, 'heading')) {
      node = {type: 'root', children: node.children};
    }

    file.data.title = toString(node);
  };
};

const through = function () {
  this.Compiler = root => root;
};

const processor = unified()
  .use(markdown)
  .use(breaks)
  .use(footnotes)
  .use(title)
  .use(remark2rehype)
  .use(highlight, {ignoreMissing: true, subset: false})
  .use(through);

export const parse = source => {
  const {data, result} = processor.processSync(source);
  return {title: data.title, tree: result};
};

export const convert = (createElement, tree, hash) => {
  const rename = id => `${hash}-${id}`;

  const h = (tagName, properties, children) => {
    // Extract `className` and other attributes from props.
    const {attrs = {}} = properties || {};

    // Rename `id` and anchor in `href`.
    if (attrs.id) {
      attrs.id = rename(attrs.id);
    }

    if (attrs.href && attrs.href.startsWith('#')) {
      attrs.href = `#${rename(attrs.href.slice(1))}`;
    }

    // Create a new element.
    return createElement(tagName, {attrs}, children);
  };

  return toH(h, tree);
};
