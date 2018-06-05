<template>
  <div>
    <loading :loading="loading" :error="error">
      <commit v-bind="commit" />
    </loading>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

import Commit from '~/components/Commit';
import Loading from '~/components/Loading';

export default {
  components: {Commit, Loading},
  async fetch({params: {hash}, store}) {
    store.dispatch('pages/commit/load', {hash});
  },
  head() {
    let title = 'commlog commit';
    if (this.loading || this.error) {
      title = `loading... | ${title}`;
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
