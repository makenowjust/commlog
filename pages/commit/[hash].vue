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
  <CommlogLoading v-if="loading" />
  <CommlogError v-else-if="error">{{ error }}</CommlogError>
  <div v-else>
    <CommlogCommit :hash="hash" />
    <section class="mx-4 pt-10">
      <h2 class="mx-auto container max-w-3xl text-xl">Comments</h2>
      <CommlogCommitCommentList
        :comments="comments"
        :has-next="Boolean(commentsLoading || commentsError)"
      />
      <CommlogLoading v-if="commentsLoading" />
      <CommlogError v-else-if="commentsError">{{ commentsError }}</CommlogError>
    </section>
  </div>
</template>
