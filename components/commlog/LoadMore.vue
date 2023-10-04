<script setup lang="ts">
defineEmits<{
  load: [];
}>();
</script>

<template>
  <div
    class="mx-auto container max-w-3xl h-48 text-center hover:text-cyan-600 transition duration-500 cursor-pointer flex justify-center items-center"
    @click="$emit('load')"
  >
    <div class="text-xl h-8">Load more.</div>
  </div>
</template>
