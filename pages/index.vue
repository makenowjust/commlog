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
  async fetch({store}) {
    store.dispatch('pages/load');
  },
  head() {
    let title = 'commlog top';
    if (this.loading) {
      title = `loading... | ${title}`;
    } else if (this.error) {
      title = `error | ${title}`;
    }

    return {title};
  },
  computed: {
    ...mapGetters('pages', ['hasNext', 'commits']),
    ...mapState('pages', ['loading', 'error']),
  },
  methods: {
    ...mapActions('pages', ['loadMore']),
  },
};
</script>
