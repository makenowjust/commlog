<script setup lang="ts">
import { Comment } from "~/composables/comments";

const props = defineProps<{
  comment: Comment;
}>();

const html = computed(() =>
  renderMarkdown(props.comment.markdown, props.comment.id),
);
</script>

<template>
  <div class="mx-auto card max-w-3xl bg-base-100">
    <div class="card-body">
      <h3 class="card-title">
        <NuxtLink
          class="inline-block mr-2"
          :to="`https://github.com/${comment.github}`"
        >
          {{ comment.github }}
          <img class="w-4 h-4 inline-block align-base" :src="comment.icon" />
        </NuxtLink>
        <time class="inline-block text-gray-500">{{ comment.time }}</time>
      </h3>
      <!-- eslint-disable vue/no-v-html -->
      <section
        class="palt mx-auto container max-w-3xl prose-sm prose prose-stone prose-headings:text-gray-600 prose-headings:font-sand-bold prose-headings:font-normal font-thin"
        v-html="html"
      />
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </div>
</template>
