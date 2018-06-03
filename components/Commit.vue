<template>
  <article :class="$style.wrap">
    <commit-body :tree="tree" />
    <section :class="$style.foot"><!--
      --><a v-if="author.github" :class="$style.author" :href="`https://github.com/${author.name}`"><!--
        -->{{author.name}}<img :src="author.icon" /><!--
      --></a><!--
      --><span v-else :class="$style.author">{{author.name}}</span><!--
      --><time :datetime="date.toISOString()">{{date.toLocaleString()}}</time><!--
      --><nuxt-link :class="$style.hash" :to="`/commit/${hash}`">#{{hash.slice(0, 7)}}</nuxt-link>
    </section>
  </article>
</template>

<style module lang="scss">
@import '~@/assets/scss/variables';

.wrap {
  border-bottom: 0.0625rem solid $light-gray;
}

.foot {
  font-size: 0.875rem;
  margin: 0 auto 1rem auto;
  padding: 0 0.5rem;
  max-width: $max-width;
  text-align: right;

  a {
    text-decoration: underline;
    color: $black;
    transition: color ease 0.3s 0s;

    &:hover {
      color: $light-blue;
    }
  }

  > :not(:last-child) {
    margin-right: 1em;
  }

  > .author {
    > img {
      height: 1em;
      width: 1em;
    }
  }

  > .hash {
    background-color: $black;
    color: $white;
    font-family: $monospace;
    padding: 0 0.25em;
    transition: color ease 0.3s 0s;

    &:hover {
      color: $light-blue;
    }
  }
}
</style>

<script>
import CommitBody from '~/components/CommitBody.vue';

export default {
  components: {CommitBody},
  props: ['hash', 'tree', 'author', 'date'],
};
</script>
