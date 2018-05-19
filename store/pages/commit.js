import {URL} from 'universal-url';

import {convertCommit} from '~/lib/store/github';
import * as load from '~/lib/store/load';

export const state = () => ({
  hash: null,
  loading: false,
  error: null,
});

export const mutations = {
  setHash(state, {hash}) {
    state.hash = hash;
  },
  ...load.mutations,
};

export const getters = {
  commit(state, _getters, _rootState, rootGetters) {
    return rootGetters.commit(state.hash);
  },
};

export const actions = {
  async load({getters, commit}, {hash}) {
    commit('setHash', {hash});
    if (getters.commit !== null) {
      return;
    }

    const url = new URL(`https://api.github.com/repos/MakeNowJust/commlog/commits/${hash}`);
    await load.wrap(commit, async () => {
      const raw = await this.$axios.$get(url);
      commit('putCommit', {commit: convertCommit(raw)}, {root: true});
    });
  },
};
