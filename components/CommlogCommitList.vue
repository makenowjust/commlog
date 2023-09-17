<script setup lang="ts">
defineProps<{
  hashes: string[];
}>();
</script>

<template>
  <!-- TODO: Why does ESLint report `vue/valid-v-for` here? I have no idea to fix it. -->
  <!-- eslint-disable-next-line vue/valid-v-for -->
  <CommlogCommit v-for="hash in hashes" :key="hash" :hash="hash" />
</template>
