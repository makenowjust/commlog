<script setup lang="ts">
const route = useRoute();
const q = String(route.query.q);

const searchUrl = (q: string) =>
  `https://api.github.com/search/commits?q=repo%3Amakenowjust%2Fcommlog%20${encodeURIComponent(
    q,
  )}&sort=author-date&order=desc`;

const { hashes, loading, error, hasNext, loadNext, nextUrl } = useFetchCommits(
  searchUrl(q),
);

watch(
  () => route.query.q,
  () => {
    // Reset search results.
    hashes.value = [];
    nextUrl.value = searchUrl(String(route.query.q));
    loadNext();
  },
);
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
