<style module lang="scss">
@import "~@/assets/scss/variables";

.wrap {
  @import "~@/assets/scss/markdown";
}
</style>

<script>
import * as markdown from 'remark-parse';
import * as rehype2react from 'rehype-react';
import * as remark2rehype from 'remark-rehype';
import * as unified from 'unified';

export default {
  props: ['source'],
  render(createElement) {
    const processor = unified()
      .use(markdown)
      .use(remark2rehype)
      .use(rehype2react, {createElement});
    const {contents} = processor.processSync(this.source);
    return createElement('section', {class: this.$style.wrap}, [contents]);
  },
};
</script>
