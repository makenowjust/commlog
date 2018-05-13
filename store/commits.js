export const state = () => ({
  cache: {},
});

export const mutations = {
  put(state, {commit}) {
    const {hash} = commit;
    state.cache[hash] = commit;
  },
};
