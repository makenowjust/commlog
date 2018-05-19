<template>
  <section v-if="loading" :class="$style.loading">
    <pre v-if="error">{{error.stack}}</pre>
    <template v-else>
      <p>Loading...</p>
      <loading-box />
    </template>
  </section>
  <div v-else><slot /></div>
</template>

<style module lang="scss">
@import '~@/assets/scss/variables';

.loading {
  max-width: $max-width;
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;
  overflow: auto;

  pre {
    text-align: left;
  }
}
</style>

<script>
import LoadingBox from './LoadingBox';

export default {
  components: {LoadingBox},
  props: ['loading', 'error'],
};
</script>
