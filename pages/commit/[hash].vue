<script setup lang="ts">
const route = useRoute();
const hash = route.params.hash as string;

const { loading, error } = useFetchCommit(hash);

const {
  comments,
  loading: commentsLoading,
  error: commentsError,
} = useFetchComments(hash);
</script>

<template>
  <div v-if="loading" class="mx-auto container max-w-3xl py-20 text-center">
    <div class="text-xl">Loading...</div>
    <span class="loading loading-bars w-24" />
  </div>
  <div v-else-if="error" class="mx-auto container max-w-3xl py-10">
    <pre class="text-red-500">{{ error }}</pre>
  </div>
  <div v-else>
    <CommlogCommit :hash="hash" />
    <section class="mx-auto container max-w-3xl pt-10">
      <h2 class="text-xl">Comments</h2>
      <template v-if="comments.length > 0">
        <CommlogCommitComment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </template>
      <div
        v-else-if="!commentsLoading && !commentsError"
        class="container text-center"
      >
        <div class="text-xl">No comments</div>
      </div>
      <div v-if="commentsLoading" class="container text-center">
        <div class="text-xl">Loading...</div>
        <span class="loading loading-bars w-24" />
      </div>
      <div v-else-if="commentsError" class="container">
        <pre class="text-red-500">{{ commentsError }}</pre>
      </div>
    </section>
  </div>
</template>
