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

export default {
  props: ['source'],
  render(h) {
    const contents = markdown(h, this.source);
    return h('section', {class: this.$style.wrap}, [contents]);
  },
};
</script>
