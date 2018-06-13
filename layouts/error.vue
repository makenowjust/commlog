<template>
  <section :class="$style.error">
    <h2>{{error.message}}</h2>
    <details v-if="error.stack">
      <summary>Stack trace</summary>
      <pre>{{error.stack}}</pre>
    </details>
  </section>
</template>

<style module lang="scss">
@import '~@/assets/scss/variables';

.error {
  overflow: auto;
  max-width: $max-width;
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-family: $emphasize;
  }

  details,
  pre {
    text-align: left;
  }
}
</style>

<script>
export default {
  props: ['error'],
};
</script>
