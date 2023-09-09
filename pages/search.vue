<template>
  <commlog-commit-list
    :commits="commits"
    :has-next="hasNext"
    :loading="loading"
    :error="error"
    @load-more="loadMore"
  />
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

import CommlogCommitList from '../components/CommlogCommitList.vue';

export default {
  components: {CommlogCommitList},
  async fetch({store, query: {q}}) {
    store.dispatch('pages/search/load', {query: q});
  },
  head() {
    let title = 'commlog search';
    if (this.loading) {
      title = `loading... | ${title}`;
    } else if (this.error) {
      title = `error | ${title}`;
    } else {
      title = `${this.$route.query.q} | ${title}`;
    }

    return {title};
  },
  computed: {
    ...mapGetters('pages/search', ['hasNext', 'commits']),
    ...mapState('pages/search', ['loading', 'error']),
  },
  methods: {
    ...mapActions('pages/search', ['loadMore']),
  },
  watchQuery: ['q'],
};
</script>
