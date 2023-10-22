<script setup lang="ts">
const props = defineProps<{
  hash: string;
}>();

const { commits } = useCommits();

const commit = computed(() => commits.value[props.hash]);
const html = computed(() =>
  renderMarkdown(commit.value.markdown, commit.value.hash),
);
</script>

<template>
  <article class="pt-8 mx-4">
    <!-- eslint-disable vue/no-v-html -->
    <section
      class="palt mx-auto container max-w-3xl prose-sm prose prose-stone prose-headings:text-gray-600 prose-headings:font-sand-bold prose-headings:font-normal font-thin break-words"
      v-html="html"
    />
    <!-- eslint-enable vue/no-v-html -->
    <section
      class="mx-auto container max-w-3xl text-xs text-right py-2 overflow-auto"
    >
      <NuxtLink
        class="inline-block mr-1"
        :to="`https://github.com/${commit.github}`"
      >
        {{ commit.github }}
        <img
          class="w-3.5 h-3.5 inline-block align-base"
          :src="commit.icon"
          :alt="`${commit.github} icon`"
        />
      </NuxtLink>
      <time class="inline-block text-gray-500 mr-1">{{ commit.time }}</time>
      <NuxtLink
        class="btn btn-xs btn-neutral"
        :to="`/commit/${commit.hash}`"
        :title="commit.hash"
      >
        #{{ commit.hash.slice(0, 7) }}
        <div class="badge">{{ commit.comments }}</div>
      </NuxtLink>
      <NuxtLink
        class="align-middle btn btn-xs"
        target="_blank"
        :to="`https://github.com/makenowjust/commlog/commit/${commit.hash}`"
      >
        <PotlabLink />
      </NuxtLink>
    </section>
  </article>
</template>
