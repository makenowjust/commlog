<template>
  <section v-test="'loading'" v-if="loading" :class="$style.loading">
    <pre v-if="error">{{ error.stack }}</pre>
    <template v-else>
      <p>Loading...</p>
      <loading-box />
    </template>
  </section>
  <div v-else><slot /></div>
</template>

<style module lang="scss">
@import '~../assets/scss/variables';

.loading {
  overflow: auto;
  max-width: $max-width;
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;

  pre {
    text-align: left;
  }
}
</style>

<script>
import LoadingBox from './LoadingBox.vue';

export default {
  components: {LoadingBox},
  props: {
    loading: {type: Boolean, required: true},
    error: {type: Error, default: null},
  },
};
</script>
