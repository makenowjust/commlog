import {convertCommit} from '~/lib/github';
import * as loader from '~/lib/loader';

export const state = () => ({
  hash: null,
  ...loader.state,
});

export const mutations = {
  setHash(state, {hash}) {
    state.hash = hash;
  },
  ...loader.mutations,
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

    const url = `https://api.github.com/repos/MakeNowJust/commlog/commits/${hash}`;
    await loader.load(commit, async () => {
      const raw = await this.$axios.$get(url);
      commit('putCommit', {commit: convertCommit(raw)}, {root: true});
    });
  },
};
