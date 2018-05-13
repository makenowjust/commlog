export const state = () => ({
  commitCache: {},
});

export const mutations = {
  putCommit(state, {commit}) {
    state.commitCache[commit.hash] = commit;
  },
  putCommits(state, {commits}) {
    for (const commit of commits) {
      state.commitCache[commit.hash] = commit;
    }
  },
};

export const getters = {
  commit(state) {
    return hash => state.commitCache[hash];
  },
};
