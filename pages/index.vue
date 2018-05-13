<template>
  <div>
    <commit v-for="hash in hashes" :key="hash" :hash="hash" />

    <template v-if="hasNext">
      <section v-if="loading" :class="$style.loading">
        <pre v-if="loadError">{{loadError.stack}}</pre>
        <template v-else>
          <p>Loading...</p>
          <loading />
        </template>
      </section>
      <section v-else :class="$style.loadMore" @click="loadMore">
        <p>Load more...</p>
      </section>
    </template>
  </div>
</template>

<style module lang="scss">
@import "~@/assets/scss/variables";

.loading, .loadMore {
  max-width: $max-width;
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;
}

.loadMore {
  cursor: pointer;
  color: $black;
  transition: color ease 0.3s 0s;

  &:hover {
    color: $light-blue;
  }
}
</style>

<script>
import {mapGetters, mapState} from 'vuex';

import Commit from '~/components/Commit.vue';
import Loading from '~/components/Loading.vue';

export default {
  components: {Commit, Loading},
  data() {
    return {
      loading: false,
      loadError: null,
    };
  },
  async fetch({store}) {
    await store.dispatch('commits/fetch');
  },
  computed: {
    ...mapGetters({
      hasNext: 'commits/hasNext',
    }),
    ...mapState({
      hashes: state => state.commits.hashes,
    }),
  },
  methods: {
    async loadMore() {
      try {
        this.loading = true;
        await this.$store.dispatch('commits/fetch');
      } catch (err) {
        this.loadError = err;
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>
