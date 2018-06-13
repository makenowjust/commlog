<template>
  <div v-test="'commit-list'">
    <commit
      v-for="commit in commits"
      :key="commit.hash"
      v-bind="commit"
      />

    <template v-if="hasNext || loading">
      <loading :loading="loading" :error="error">
        <section :class="$style['load-more']" @click="loadMore" v-test="'load-more'">
          <p>Load more...</p>
        </section>
      </loading>
    </template>
  </div>
</template>

<style module lang="scss">
@import '~@/assets/scss/variables';

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
import Commit from './Commit';
import Loading from './Loading';

export default {
  components: {Commit, Loading},
  props: ['commits', 'hasNext', 'loading', 'error'],
  methods: {
    loadMore() {
      this.$emit('load-more');
    },
  },
};
</script>
