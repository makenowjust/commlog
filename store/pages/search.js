import {URL} from 'universal-url';

import {convertPage} from '~/lib/store/github';
import * as load from '~/lib/store/load';

export const state = () => ({
  query: null,
  next: null,
  hashes: [],
  loading: false,
  error: null,
});

export const mutations = {
  setQuery(state, {query}) {
    if (state.qeury === query) {
      return;
    }

    state.query = query;
    state.hashes = [];

    const next = new URL('https://api.github.com/search/commits');
    next.searchParams.append('q', `repo:MakeNowJust/commlog ${query}`);
    next.searchParams.append('sort', 'author-date');
    next.searchParams.append('order', 'desc');
    state.next = next;
  },
  appendPage(state, {hashes, next}) {
    state.hashes = state.hashes.concat(hashes);
    state.next = next;
  },
  ...load.mutations,
};

export const getters = {
  hasNext(state) {
    return state.hashes.length > 0 && !!state.next;
  },
  commits(state, _getters, _rootState, rootGetters) {
    return state.hashes.map(hash => rootGetters.commit(hash));
  },
};

export const actions = {
  async load({state, commit, dispatch}, {query}) {
    commit('setQuery', {query});
    if (state.hashes.length > 0) {
      return;
    }

    await dispatch('loadMore');
  },
  async loadMore({state, commit}) {
    if (state.next === null) {
      return;
    }

    await load.wrap(commit, async () => {
      const response = await this.$axios.get(state.next);
      const page = convertPage(response);

      commit('putCommits', page, {root: true});
      commit('appendPage', page);
    });
  },
};
