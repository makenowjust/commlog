<template>
  <article
    v-test="`commit commit-${hash.slice(0, 7)}`"
    :class="$style.wrap">
    <commit-body :tree="tree" />
    <section :class="$style.foot">
      <a v-if="author.github" :class="$style.author" :href="`https://github.com/${author.name}`">
        {{ author.name }}<img :src="author.icon" :alt="`${author.name} icon`" />
      </a>
      <span v-else :class="$style.author">{{ author.name }}</span>
      <time :datetime="date.toISOString()">{{ date.toLocaleString() }}</time>
      <nuxt-link v-test="'commit-link'" :class="$style.hash" :to="`/commit/${hash}`">#{{ hash.slice(0, 7) }}</nuxt-link>
      <a v-test="'commit-external-link'" :href="`https://github.com/MakeNowJust/commlog/commit/${hash}`">
        <icon name="external-link-alt" />
      </a>
    </section>
  </article>
</template>

<style module lang="scss">
@import '~../assets/scss/variables';

.wrap {
  border-bottom: 0.063rem solid $light-gray;
}

.foot {
  max-width: $max-width;
  padding: 0 0.5rem;
  margin: 0 auto 1rem;
  font-size: 0;
  text-align: right;

  > * {
    display: inline-block;
    font-size: 0.8rem;
  }

  a {
    color: $black;
    text-decoration: underline;
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
      width: 1em;
      height: 1em;
    }
  }

  > .hash {
    padding: 0 0.25em;
    color: $white;
    background-color: $black;
    font-family: $monospace;
    transition: color ease 0.3s 0s;

    &:hover {
      color: $light-blue;
    }
  }
}
</style>

<script>
import 'vue-awesome/icons/external-link-alt';
import Icon from 'vue-awesome/components/Icon.vue';

import CommitBody from './CommitBody.vue';

export default {
  components: {CommitBody, Icon},
  props: {
    hash: {type: String, required: true},
    tree: {type: Object, required: true},
    author: {type: Object, required: true},
    date: {type: Date, required: true},
  },
};
</script>
