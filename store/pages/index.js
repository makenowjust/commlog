import {URL} from 'universal-url';

import {convertPage} from '~/lib/github';
import * as loader from '~/lib/loader';

export const state = () => ({
  next: new URL('https://api.github.com/repos/MakeNowJust/commlog/commits'),
  hashes: [],
  ...loader.state,
});

export const mutations = {
  appendPage(state, {hashes, next}) {
    state.hashes = state.hashes.concat(hashes);
    state.next = next;
  },
  ...loader.mutations,
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
  async load({state, dispatch}) {
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