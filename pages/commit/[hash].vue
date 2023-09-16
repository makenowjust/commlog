<script setup lang="ts">
const route = useRoute();
const hash = route.params.hash as string;

const { loading, error } = useFetchCommit(hash);
</script>

<template>
  <div v-if="loading" class="mx-auto container max-w-3xl py-20 text-center">
    <div class="text-xl">Loading...</div>
    <span class="loading loading-bars w-24"></span>
  </div>
  <div v-else-if="error" class="mx-auto container max-w-3xl py-10">
    <pre>{{ error }}</pre>
  </div>
  <CommlogCommit v-else :hash="hash" />
</template>
