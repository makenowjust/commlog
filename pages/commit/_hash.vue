<template>
  <div>
    <loading :loading="loading" :error="error"> <commit v-bind="commit" /> </loading>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

import Commit from '../../components/Commit.vue';
import Loading from '../../components/Loading.vue';

export default {
  components: {Commit, Loading},
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
