import qs from 'qs';

import {convertPage} from '../../lib/github';
import * as loader from '../../lib/loader';

export const state = () => ({
  query: null,
  next: null,
  hashes: [],
  ...loader.state,
});

export const mutations = {
  setQuery(state, {query}) {
    if (state.query === query) {
      return;
    }

    state.query = query;
    state.hashes = [];

    const params = {
      q: `repo:MakeNowJust/commlog ${query}`,
      sort: 'author-date',
      order: 'desc',
    };
    state.next = `https://api.github.com/search/commits?${qs.stringify(params)}`;
  },
  appendPage(state, {hashes, next}) {
    state.hashes = [...state.hashes, ...hashes];
    state.next = next;
  },
  ...loader.mutations,
};

export const getters = {
  hasNext(state) {
    return state.hashes.length > 0 && Boolean(state.next);
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

    await loader.load(commit, async () => {
      const response = await this.$axios.get(state.next);
      const page = convertPage(response);

      commit('putCommits', page, {root: true});
      commit('appendPage', page);
    });
  },
};
