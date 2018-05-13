<template>
  <div>
    <commit v-for="hash in hashes" :key="hash" :hash="hash" />

    <template v-if="next">
      <section v-if="loading" :class="$style.loading">
        <pre v-if="loadError">{{loadError.stack}}</pre>
        <template v-else>
          <p>Loading...</p>
          <loading />
        </template>
      </section>
      <section v-else :class="$style.loadMore" @click="loadMore">
        <p>Load more...</p>
      </section>
    </template>
  </div>
</template>

<style module lang="scss">
@import "~@/assets/scss/variables";

.loading, .loadMore {
  max-width: $max-width;
  padding: 5rem 0;
  margin: 0 auto;
  text-align: center;
}

.loadMore {
  cursor: pointer;
  color: $black;
  transition: color ease 0.3s 0s;

  &:hover {
    color: $light-blue;
  }
}
</style>

<script>
import * as parseLinkHeader from 'parse-link-header';

import Commit from '~/components/Commit.vue';
import Loading from '~/components/Loading.vue';

const fetchCommits = async (
  {$axios, $store},
  url = 'https://api.github.com/repos/MakeNowJust/commlog/commits?sha=commlog&page=1',
) => {
  const result = await $axios.get(url);

  const rawCommits = result.data;
  const commits = rawCommits.map(raw => ({
    hash: raw.sha,
    message: raw.commit.message,
    author: {
      github: !!(raw.author && raw.author.login),
      name: raw.author && raw.author.login || raw.commit.author.name,
      email: raw.commit.author.email,
      icon: raw.author && raw.author.avatar_url,
    },
    date: new Date(raw.commit.author.date),
  }));

  for (const commit of commits) {
    $store.commit('commits/put', {commit});
  }

  const link = parseLinkHeader(result.headers.link);

  return {
    commits,
    next: link.next && link.next.url,
  };
};

export default {
  components: {Commit, Loading},
  data() {
    return {
      loading: false,
      loadError: null,
    };
  },
  async asyncData({$axios, store: $store}) {
    const {commits, next} = await fetchCommits({$axios, $store});

    return {
      next,
      hashes: commits.map(({hash}) => hash),
    };
  },
  methods: {
    async loadMore() {
      try {
        this.loading = true;
        const {commits, next} = await fetchCommits(this, this.next);
        this.hashes = this.hashes.concat(commits.map(({hash}) => hash));
        this.next = next;
      } catch (err) {
        this.loadError = err;
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>
