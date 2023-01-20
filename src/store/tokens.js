import VueCookies from 'vue-cookies';

export default {
  namespaced: true,

  state: () => ({
    accessTokenExpires: VueCookies.get('accessTokenExpires'),
    accessTokenValue: VueCookies.get('accessTokenValue'),
    interval: null,
    loggedIn: false,
    now: Math.round(Date.now() / 1000),
    refreshTokenExpires: VueCookies.get('refreshTokenExpires'),
    refreshTokenValue: VueCookies.get('refreshTokenValue'),
  }),

  mutations: {
    SET_NOW: (state, payload) => {
      state.now = payload;
    },

    SET_INTERVAL: (state, payload) => {
      state.interval = payload;
    },

    SET_ACCESS_TOKEN_VALUE: (state, payload) => {
      state.accessTokenValue = payload;
    },

    SET_ACCESS_TOKEN_EXPIRES: (state, payload) => {
      state.accessTokenExpires = payload;
    },

    SET_REFRESH_TOKEN_VALUE: (state, payload) => {
      state.refreshTokenValue = payload;
    },

    SET_REFRESH_TOKEN_EXPIRES: (state, payload) => {
      state.refreshTokenExpires = payload;
    },
  },

  actions: {
    logout: (context) => {
      context.commit('SET_ACCESS_TOKEN_EXPIRES', '');

      context.commit('SET_ACCESS_TOKEN_VALUE', '');

      context.commit('SET_REFRESH_TOKEN_EXPIRES', '');

      context.commit('SET_REFRESH_TOKEN_VALUE', '');

      clearInterval(context.state.interval);

      context.commit('SET_INTERVAL', null);

      context.commit('SET_NOW', null);
    },

    accessTokenExpires: ({
      state,
      commit,
    }, payload) => {
      if (payload) {
        commit('SET_ACCESS_TOKEN_EXPIRES', payload);
      }

      if (!state.interval) {
        const updateSeconds = () => {
          const now = Math.round(Date.now() / 1000);

          commit('SET_NOW', now);
        };
        const interval = setInterval(updateSeconds, 1000);

        commit('SET_INTERVAL', interval);
      }
    },

    accessTokenValue: (context, payload) => {
      if (payload) {
        context.commit('SET_ACCESS_TOKEN_VALUE', payload);
      }
    },

    refreshTokenExpires: (context, payload) => {
      if (payload) {
        context.commit('SET_REFRESH_TOKEN_EXPIRES', payload);
      }
    },

    refreshTokenValue: (context, payload) => {
      if (payload) {
        context.commit('SET_REFRESH_TOKEN_VALUE', payload);
      }
    },
  },

  getters: {

    isLoggedIn: (state) => state.accessTokenExpires > state.now * 1000,

    accessTokenExpires: (state) => state.accessTokenExpires * 1000,

    accessTokenValue: (state) => state.accessTokenValue,

    refreshTokenExpires: (state) => state.refreshTokenExpires * 1000,

    refreshTokenValue: (state) => state.refreshTokenValue,
  },
};
