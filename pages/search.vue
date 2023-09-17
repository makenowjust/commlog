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
    <div v-if="loading" class="mx-auto container max-w-3xl py-20 text-center">
      <div class="text-xl">Loading...</div>
      <span class="loading loading-bars w-24" />
    </div>
    <div
      v-else-if="hasNext"
      class="mx-auto container max-w-3xl py-20 text-center hover:opacity-50 transition-opacity duration-500 cursor-pointer"
      @click="loadNext"
    >
      <div class="text-xl">Load more.</div>
    </div>
    <div v-else-if="error" class="mx-auto container max-w-3xl py-10">
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>
