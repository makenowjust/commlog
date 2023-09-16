<script setup lang="ts">
defineProps<{
  hashes: string[];
}>();
</script>

<template>
  <CommlogCommit v-for="hash in hashes" :hash="hash" />
</template>