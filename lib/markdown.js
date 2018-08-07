import highlight from 'rehype-highlight';
import is from 'unist-util-is';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
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
  .use(markdown)
  .use(title)
  .use(remark2rehype)
  .use(highlight, {ignoreMissing: true, subset: false})
  .use(through);

export default source => {
  const {data, contents} = processor.processSync(source);
  return {title: data.title, tree: contents};
};