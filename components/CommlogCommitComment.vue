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
  <div class="card w-3xl bg-base-100">
    <div class="card-body">
      <h3 class="card-title">{{ comment.github }}</h3>
      <!-- eslint-disable vue/no-v-html -->
      <section
        class="palt mx-auto container max-w-3xl prose-sm prose prose-stone prose-headings:text-gray-600 prose-headings:font-sand-bold prose-headings:font-normal font-thin"
        v-html="html"
      />
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </div>
</template>
