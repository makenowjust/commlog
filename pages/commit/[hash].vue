<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <CommlogCommit :hash="(route.params.hash as string)" />
</template>
