<script setup lang="ts">
defineProps<{
  hashes: string[];
}>();
</script>

<template>
  <div v-for="hash in hashes" :key="hash">
    <CommlogCommit :hash="hash" />
    <div class="divider" />
  </div>
</template>
