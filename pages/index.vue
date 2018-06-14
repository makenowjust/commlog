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

import CommitList from '../components/CommitList.vue';

export default {
  components: {CommitList},
  async fetch({store}) {
    store.dispatch('pages/index/load');
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
    ...mapGetters('pages/index', ['hasNext', 'commits']),
    ...mapState('pages/index', ['loading', 'error']),
  },
  methods: {
    ...mapActions('pages/index', ['loadMore']),
  },
};
</script>
