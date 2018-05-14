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
  commit(state, _getters, rootState, rootGetters) {
    return rootGetters.commit(state.hash);
  },
};

export const actions = {
  async load({getters, commit, state, rootState}, {hash}) {
    if (getters.commit !== undefined) {
      return;
    }

    const url = new URL(`https://api.github.com/repos/MakeNowJust/commlog/commits/${hash}`);
    await load.wrap(commit, async () => {
      const raw = await this.$axios.$get(url);
      commit('putCommit', {commit: convertCommit(raw)}, {root: true});
    });
    commit('setHash', {hash});
  },
};
