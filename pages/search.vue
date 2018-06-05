<template>
  <commit-list
    :commits="commits"
    :has-next="hasNext"
    :loading="loading"
    :error="error"
    @load-more="loadMore"
    />
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

import CommitList from '~/components/CommitList.vue';

export default {
  components: {CommitList},
  async fetch({store, query: {q}}) {
    store.dispatch('pages/search/load', {query: q});
  },
  head() {
    let title = 'commlog search';
    if (this.loading || this.error) {
      title = `loading... | ${title}`;
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
