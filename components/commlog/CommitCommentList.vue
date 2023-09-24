<script setup lang="ts">
import { Comment } from "~/composables/comments";

defineProps<{
  comments: Comment[];
  hasNext: boolean;
}>();
</script>

<template>
  <template v-if="comments.length > 0">
    <CommlogCommitComment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </template>
  <div v-else-if="!hasNext" class="mx-auto container max-w-3xl text-center">
    <div class="text-xl">No comments</div>
  </div>
</template>
