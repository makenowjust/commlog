<template>
  <div>
    <commit v-for="commit in commits" :key="commit.hash" v-bind="commit" />

    <template v-if="hasNext">
      <loading :loading="loading" :error="error">
        <section :class="$style.loadMore" @click="loadMore">
          <p>Load more...</p>
        </section>
      </loading>
    </template>
  </div>
</template>

<style module lang="scss">
@import "~@/assets/scss/variables";

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
import {mapActions, mapGetters, mapState} from 'vuex';

import Commit from '~/components/Commit.vue';
import Loading from '~/components/Loading.vue';

export default {
  components: {Commit, Loading},
  async fetch({store}) {
    await store.dispatch('pages/index/load');
  },
  computed: {
    ...mapGetters('pages/index', ['hasNext', 'commits']),
    ...mapState('pages/index', ['loading', 'error']),
  },
  methods: {
    ...mapActions('pages/index', ['loadMore']),
  },
};
</script>
