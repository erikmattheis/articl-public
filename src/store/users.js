export default {
  namespaced: true,

  state: () => ({
    isEmailVerified: undefined,
    user: undefined,
    userFullName: undefined,
    userId: undefined,
  }),

  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    },
  },

  actions: {
    setUser: (context, payload) => {
      context.commit('SET_USER', payload);
    },
  },
  getters: {

    isEmailVerified: (state) => state.user.isEmailVerified,

    user: (state) => state.user,

    userFullName: (state) => `${state.user.nameFirst} ${state.user.nameLast}`,

    userId: (state) => state.user.id,

  },
};
