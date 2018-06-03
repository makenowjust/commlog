export const state = {
  loading: false,
  error: null,
};

export const mutations = {
  setLoading(state, {loading}) {
    state.loading = loading;
  },
  setError(state, {error}) {
    state.error = error;
  },
};

export const load = async (commit, action) => {
  commit('setError', { error: null });
  commit('setLoading', { loading: true });
  try {
    const result = await action();
    commit('setLoading', { loading: false });
    return result;
  } catch (error) {
    commit('setError', { error });
    throw error;
  }
};
