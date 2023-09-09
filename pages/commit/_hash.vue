<template>
  <div>
    <commlog-loading :loading="loading" :error="error">
      <commlog-commit v-bind="commit" />
    </commlog-loading>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

import CommlogCommit from '../../components/CommlogCommit.vue';
import CommlogLoading from '../../components/CommlogLoading.vue';

export default {
  components: {CommlogCommit, CommlogLoading},
  async fetch({params: {hash}, store}) {
    store.dispatch('pages/commit/load', {hash});
  },
  head() {
    let title = 'commlog commit';
    if (this.loading) {
      title = `loading... | ${title}`;
    } else if (this.error) {
      title = `error | ${title}`;
    } else {
      const hash = this.commit.hash.slice(0, 7);
      title = `#${hash} ${this.commit.title} | ${title}`;
    }

    return {title};
  },
  computed: {
    ...mapGetters('pages/commit', ['commit']),
    ...mapState('pages/commit', ['loading', 'error']),
  },
};
</script>
