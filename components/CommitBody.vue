<style module lang="scss">
@import '~../assets/scss/variables';

.wrap {
  font-size: 0.875rem;
  word-wrap: break-word;
  overflow-wrap: break-word;

  // stylelint-disable-next-line at-rule-empty-line-before
  @import '~../assets/scss/markdown';
}
</style>

<script>
import * as markdown from '../lib/markdown';

export default {
  props: {
    tree: {type: Object, required: true},
  },
  render(createElement) {
    const elements = markdown.convert(createElement, this.tree);

    return createElement(
      'section',
      {
        class: this.$style.wrap,
        directives: [
          {
            name: 'test',
            value: 'commit-body',
          },
        ],
      },
      [elements],
    );
  },
};
</script>
