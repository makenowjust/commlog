<style module lang="scss">
@import "~@/assets/scss/variables";

.wrap {
  font-size: 0.875rem;
  word-wrap : break-word;
  overflow-wrap : break-word;

  @import "~@/assets/scss/markdown";
}
</style>

<script>
import * as markdown from 'remark-parse';
import * as rehype2react from 'rehype-react';
import * as remark2rehype from 'remark-rehype';
import * as highlight from 'rehype-highlight';
import * as unified from 'unified';

export default {
  props: ['source'],
  render(h) {
    const createElement = (tagName, props, children) => {
      const {className, ...attrs} = props || {};
      return h(tagName, {
        class: className,
        attrs,
      }, children);
    };

    const processor = unified()
      .use(markdown)
      .use(remark2rehype)
      .use(highlight, {ignoreMissing: true, subset: false})
      .use(rehype2react, {createElement});
    const {contents} = processor.processSync(this.source);

    return createElement('section', {class: this.$style.wrap}, [contents]);
  },
};
</script>
