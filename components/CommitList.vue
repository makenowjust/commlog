<template>
  <div v-test="'commit-list'">
    <commit
      v-for="commit in commits"
      :key="commit.hash"
      v-bind="commit"
      />

    <template v-if="hasNext || loading">
      <loading :loading="loading" :error="error">
        <section :class="$style.loadMore" @click="loadMore" v-test="'load-more'">
          <p>Load more...</p>
        </section>
      </loading>
    </template>
  </div>
</template>

<style module lang="scss">
@import '~@/assets/scss/variables';

.loadMore {
  max-width: $max-width;
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
  color: $black;
  transition: color ease 0.3s 0s;

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
