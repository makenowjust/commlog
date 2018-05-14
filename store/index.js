export const state = () => ({
  commitCache: {},
});

export const mutations = {
  putCommit(state, {commit}) {
    state.commitCache = {
      ...state.commitCache,
      [commit.hash]: commit,
    };
  },
  putCommits(state, {commits}) {
    const cache = {};
    for (const commit of commits) {
      cache[commit.hash] = commit;
    }
    state.commitCache = {
      ...state.commitCache,
      ...cache,
    };
  },
};

export const getters = {
  commit(state) {
    return hash => state.commitCache[hash] || null;
  },
};
