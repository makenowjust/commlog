<script setup lang="ts">
import { Comment } from "~/composables/comments";

defineProps<{
  comments: Comment[];
  hasNext: boolean;
}>();
</script>

<template>
  <template v-if="comments.length > 0">
    <div v-for="comment in comments" :key="comment.id" class="-mb-6">
      <CommlogCommitComment :comment="comment" />
    </div>
  </template>
  <div v-else-if="!hasNext" class="mx-auto container max-w-3xl text-center">
    <div class="text-xl">No comments</div>
  </div>
</template>
