<template>
  <article :class="$style.wrap" v-test="`commit commit-${hash.slice(0, 7)}`">
    <commit-body :tree="tree" />
    <section :class="$style.foot">
      <a v-if="author.github" :class="$style.author" :href="`https://github.com/${author.name}`">
        {{author.name}}<img :src="author.icon" />
      </a>
      <span v-else :class="$style.author">{{author.name}}</span>
      <time :datetime="date.toISOString()">{{date.toLocaleString()}}</time>
      <nuxt-link :class="$style.hash" :to="`/commit/${hash}`" v-test="'commit-link'">#{{hash.slice(0, 7)}}</nuxt-link>
      <a :href="`https://github.com/MakeNowJust/commlog/commit/${hash}`" v-test="'commit-external-link'">
        <icon name="external-link-alt" />
      </a>
    </section>
  </article>
</template>

<style module lang="scss">
@import '~@/assets/scss/variables';

.wrap {
  border-bottom: 0.0625rem solid $light-gray;
}

.foot {
  font-size: 0;
  margin: 0 auto 1rem auto;
  padding: 0 0.5rem;
  max-width: $max-width;
  text-align: right;

  > * {
    font-size: 0.8rem;
    display: inline-block;
  }

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
import 'vue-awesome/icons/external-link-alt';
import Icon from 'vue-awesome/components/Icon';

import CommitBody from '~/components/CommitBody.vue';

export default {
  components: {CommitBody, Icon},
  props: ['hash', 'tree', 'author', 'date'],
};
</script>
