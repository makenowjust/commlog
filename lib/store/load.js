export const wrap = async (commit, fn) => {
  commit('setError', {error: null});
  commit('setLoading', {loading: true});
  try {
    const result = await fn();
    commit('setLoading', {loading: false});
    return result;
  } catch (error) {
    commit('setError', {error});
    throw error;
  }
};

export const mutations = {
  setLoading(state, {loading}) {
    state.loading = loading;
  },
  setError(state, {error}) {
    state.error = error;
  },
};
