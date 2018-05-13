import * as parseLinkHeader from 'parse-link-header';

const convertCommit = raw => ({
  hash: raw.sha,
  message: raw.commit.message,
  author: {
    github: !!(raw.author && raw.author.login),
    name: raw.author && raw.author.login || raw.commit.author.name,
    email: raw.commit.author.email,
    icon: raw.author && raw.author.avatar_url,
  },
  date: new Date(raw.commit.author.date),
});

export const state = () => ({
  hashes: [],
  next: 'https://api.github.com/repos/MakeNowJust/commlog/commits?sha=commlog&page=1',
  cache: {},
});

export const mutations = {
  appendHashes(state, {hashes}) {
    state.hashes = state.hashes.concat(hashes);
  },
  setNext(state, {next}) {
    state.next = next;
  },
  putCommits(state, {commits}) {
    for (const commit of commits) {
      const {hash} = commit;
      state.cache[hash] = commit;
    }
  },
  putCommit(state, {commit}) {
    const {hash} = commit;
    state.cache[hash] = commit;
  },
};

export const getters = {
  hasNext(state) {
    return !!state.next;
  },
};

export const actions = {
  async fetch({commit, state}) {
    const result = await this.$axios.get(state.next);

    const rawCommits = result.data;
    const commits = rawCommits.map(convertCommit);
    commit('putCommits', {commits});

    const hashes = commits.map(({hash}) => hash);
    commit('appendHashes', {hashes});

    const link = parseLinkHeader(result.headers.link);
    const next = link.next && link.next.url;
    commit('setNext', {next});
  },
};
