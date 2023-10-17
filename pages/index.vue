<script setup lang="ts">
const { hashes, loading, error, hasNext, loadNext } = useFetchCommits();
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
