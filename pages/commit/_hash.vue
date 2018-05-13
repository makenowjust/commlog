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
    await store.dispatch('pages/commit/load', {hash});
  },
  computed: {
    ...mapGetters('pages/commit', ['commit']),
    ...mapState('pages/commit', ['loading', 'error']),
  },
}
</script>
