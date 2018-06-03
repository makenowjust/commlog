import * as markdown from 'remark-parse';
import * as remark2rehype from 'remark-rehype';
import * as highlight from 'rehype-highlight';
import * as unified from 'unified';
import is from 'unist-util-is';
import toString from 'mdast-util-to-string';

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
  .use(markdown)
  .use(title)
  .use(remark2rehype)
  .use(highlight, {ignoreMissing: true, subset: false})
  .use(through);

export default source => {
  const {data, contents} = processor.processSync(source);
  return {title: data.title, tree: contents};
};
