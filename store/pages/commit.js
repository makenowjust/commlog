import {URL} from 'universal-url';

import {convertCommit} from '~/assets/js/util/github';
import * as load from '~/assets/js/util/load';

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
  async load({rootGetters, commit}, {hash}) {
    if (rootGetters.commit(hash) === undefined) {
      const url = new URL(`https://api.github.com/repos/MakeNowJust/commlog/commits/${hash}`);
      await load.wrap(commit, async () => {
        const raw = await this.$axios.$get(url);
        const c = convertCommit(raw);
        commit('putCommit', {commit: c}, {root: true});
        hash = c.hash;
      });
    }

    commit('setHash', {hash});
  },
};
