<template>
  <div>
    <commit :hash="hash" />
  </div>
</template>

<script>
import Commit from '~/components/Commit';

export default {
  components: {Commit},
  async asyncData({route, store}) {
    const {hash} = route.params;
    await store.dispatch('commits/fetchCommit', {hash});
    return {hash};
  },
}
</script>
