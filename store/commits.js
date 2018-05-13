import * as parseLinkHeader from 'parse-link-header';
import {URL} from 'universal-url';

const API_BASE = 'https://api.github.com';
const REPO = 'MakeNowJust/commlog';

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
  query: undefined,
  next: null,
  hashes: [],
  cache: {},
});

export const mutations = {
  setQuery(state, {query}) {
    if (query !== state.query) {
      state.query = query;
      state.hashes = [];
      if (query === '') {
        const next = new URL(`${API_BASE}/repos/${REPO}/commits`);
        state.next = next;
      } else {
        const next = new URL(`${API_BASE}/search/commits`);
        next.searchParams.append('q', `repo:${REPO} ${query}`);
        next.searchParams.append('sort', 'author-date');
        next.searchParams.append('order', 'desc');
        state.next = next;
      }
    }
  },
  appendHashes(state, {hashes}) {
    state.hashes = state.hashes.concat(hashes);
  },
  setNext(state, {next}) {
    if (next) {
      next = new URL(next);
    }
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
    return state.hashes.length > 0 && !!state.next;
  },
};

export const actions = {
  async fetch({state, commit, dispatch}, {query = ''} = {}) {
    commit('setQuery', {query});
    if (state.hashes.length === 0) {
      await dispatch('fetchNext');
    }
  },
  async fetchNext({commit, state}) {
    const {next: url} = state;
    const result = await this.$axios.get(url);

    const raws = result.data.items || result.data;
    const commits = raws.map(convertCommit);
    commit('putCommits', {commits});

    const hashes = commits.map(({hash}) => hash);
    commit('appendHashes', {hashes});

    const link = parseLinkHeader(result.headers.link || '');
    const next = link && link.next && link.next.url;
    commit('setNext', {next});
  },
  async fetchCommit({commit, state}, {hash}) {
    if (state.cache[hash]) {
      return;
    }

    const raw = await this.$axios.$get(`${API_BASE}/repos/${REPO}/commits/${hash}`);
    commit('putCommit', {commit: convertCommit(raw)});
  },
};
