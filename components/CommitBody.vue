<style module lang="scss">
@import '~@/assets/scss/variables';

.wrap {
  font-size: 0.875rem;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @import '~@/assets/scss/markdown';
}
</style>

<script>
import markdown from '~/lib/markdown';
import toH from 'hast-to-hyperscript';

export default {
  props: ['tree'],
  render(createElement) {
    const h = (tagName, props, children) => {
      const {className, ...attrs} = props || {};
      return createElement(
        tagName,
        {
          class: className,
          attrs,
        },
        children,
      );
    };

    const elements = toH(h, this.tree);
    return h('section', {class: this.$style.wrap}, [elements]);
  },
};
</script>
