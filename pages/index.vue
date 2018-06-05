<template>
  <commits
    :commits="commits"
    :has-next="hasNext"
    :loading="loading"
    :error="error"
    @load-more="loadMore"
    />
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

import Commits from '~/components/Commits.vue';

export default {
  components: {Commits},
  async fetch({store}) {
    store.dispatch('pages/index/load');
  },
  head() {
    let title = 'commlog top';
    if (this.loading || this.error) {
      title = `loading... | ${title}`;
    }

    return {title};
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
