<template>
  <div v-test="'commit-list'">
    <commlog-commit v-for="commit in commits" :key="commit.hash" v-bind="commit" />

    <template v-if="hasNext || loading">
      <commlog-loading :loading="loading" :error="error">
        <section v-test="'load-more'" :class="$style['load-more']" @click="loadMore">
          <p>Load more...</p>
        </section>
      </commlog-loading>
    </template>
  </div>
</template>

<style module lang="scss">
@import '~../assets/scss/variables';

.load-more {
  max-width: $max-width;
  padding: 5rem 0;
  margin: 0 auto;
  color: $black;
  text-align: center;
  transition: color ease 0.3s 0s;
  cursor: pointer;

  &:hover {
    color: $light-blue;
  }
}
</style>

<script>
import CommlogCommit from './CommlogCommit.vue';
import CommlogLoading from './CommlogLoading.vue';

export default {
  components: {CommlogCommit, CommlogLoading},
  props: {
    commits: {type: Array, required: true},
    hasNext: {type: Boolean, required: true},
    loading: {type: Boolean, required: true},
    error: {type: Error, default: null},
  },
  methods: {
    loadMore() {
      this.$emit('load-more');
    },
  },
};
</script>
