<script setup lang="ts">
const { hashes, loading, error, hasNext, loadNext } = useFetchCommits('https://api.github.com/repos/makenowjust/commlog/commits');
</script>

<template>
  <CommlogCommitList :hashes="hashes" />
  <div v-if="loading" class="mx-auto container max-w-3xl py-20 text-center">
    <div class="text-xl">Loading...</div>
    <span class="loading loading-bars w-24"></span>
  </div>
  <div v-else-if="hasNext" class="mx-auto container max-w-3xl py-20 text-center hover:text-cyan-600 transition duration-500 cursor-pointer" @click="loadNext">
    <div class="text-xl">Load more.</div>
  </div>
  <div v-else-if="error" class="mx-auto container max-w-3xl py-10">
    <pre>{{error}}</pre>
  </div>
</template>
