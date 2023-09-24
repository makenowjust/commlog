<script setup lang="ts">
defineEmits<{
  load: [];
}>();
</script>

<template>
  <div
    class="mx-auto container max-w-3xl text-center hover:text-cyan-600 transition duration-500 cursor-pointer"
    @click="$emit('load')"
  >
    <div class="text-xl">Load more.</div>
  </div>
</template>
