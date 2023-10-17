<script setup lang="ts">
const route = useRoute();
const q = computed(() => String(route.query.q));

const { hashes, loading, error, hasNext, loadNext } = useSearchCommits(q);
</script>

<template>
  <div>
    <CommlogCommitList :hashes="hashes" />
    <div v-if="loading || hasNext">
      <CommlogLoading v-if="loading" />
      <CommlogLoadMore v-else @load="loadNext" />
    </div>
    <div v-else-if="error" class="py-10">
      <CommlogError>{{ error }}</CommlogError>
    </div>
  </div>
</template>
