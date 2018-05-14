import Vue from 'vue';

export const state = () => ({
  commitCache: {},
});

export const mutations = {
  putCommit(state, {commit}) {
    Vue.set(state.commitCache, commit.hash, commit);
  },
  putCommits(state, {commits}) {
    for (const commit of commits) {
      Vue.set(state.commitCache, commit.hash, commit);
    }
  },
};

export const getters = {
  commit(state) {
    return hash => state.commitCache[hash] || null;
  },
};
