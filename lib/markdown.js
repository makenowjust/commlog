import toH from 'hast-to-hyperscript';
import highlight from 'rehype-highlight';
import is from 'unist-util-is';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import breaks from 'remark-breaks';
import toString from 'mdast-util-to-string';
import unified from 'unified';

const title = function() {
  return (root, file) => {
    let node = root.children[0];
    if (is('heading', node)) {
      node = {type: 'root', children: node.children};
    }

    file.data.title = toString(node);
  };
};

const through = function() {
  this.Compiler = node => node;
};

const processor = unified()
  .data('settings', {footnotes: true})
  .use(markdown)
  .use(breaks)
  .use(title)
  .use(remark2rehype)
  .use(highlight, {ignoreMissing: true, subset: false})
  .use(through);

export const parse = source => {
  const {data, contents} = processor.processSync(source);
  return {title: data.title, tree: contents};
};

export const convert = (createElement, tree, hash) => {
  const rename = id => `${hash}-${id}`;

  const h = (tagName, properties, children) => {
    // Extract `className` and other attributes from props.
    const {class: className, ...attributes} = properties || {};

    // Rename `id` and anchor in `href`.
    if (attributes.id) {
      attributes.id = rename(attributes.id);
    }

    if (attributes.href && attributes.href.startsWith('#')) {
      attributes.href = `#${rename(attributes.href.slice(1))}`;
    }

    // Create a new element.
    return createElement(
      tagName,
      {
        // Add `className` as `class` if given.
        ...(className ? {class: className} : {}),
        ...attributes,
      },
      children,
    );
  };

  return toH(h, tree);
};
