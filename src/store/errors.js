export default {
  namespaced: true,

  state: () => ({
    errorMessage: undefined,
    errorTitle: undefined,
    errorFileName: undefined,
    errorLineNumber: undefined,
    errorStack: undefined,
    successTitle: undefined,
    successMessage: undefined,
    okFunction: undefined,
  }),

  mutations: {
    SET_OK_FUNCTION: (state, payload) => {
      state.okFunction = payload;
    },
    SET_SUCCESS_MESSAGE: (state, payload) => {
      state.successMessage = payload;
    },

    SET_ERROR_TITLE: (state, payload) => {
      state.errorTitle = payload;
    },

    SET_ERROR_MESSAGE: (state, payload) => {
      state.errorMessage = payload;
    },

    SET_ERROR_FILE_NAME: (state, payload) => {
      state.errorFileName = payload;
    },

    SET_ERROR_LINE_NUMBER: (state, payload) => {
      state.errorLineNumber = payload;
    },

    SET_ERROR_STACK: (state, payload) => {
      state.errorStack = payload;
    },
  },

  actions: {
    setError: (context, payload) => {
      let errorTitle = 'Error';
      let errorMessage = 'Unknown error';
      let errorFileName = '';
      let errorLineNumber = '';
      let errorStack = '';

      if (!payload.okFunction) {
        context.commit('SET_OK_FUNCTION', () => { });
      }
      if (payload?.response?.data?.message) {
        errorMessage = payload.response.data.message;
      } else if (payload?.message) {
        errorMessage = payload?.message;
      } else if (typeof payload === 'string' && payload.length > 0) {
        errorMessage = payload;
      }

      if (payload?.response?.data?.fileName) {
        errorFileName = payload.response.data.fileName;
      } else if (payload?.fileName) {
        errorFileName = payload.fileName;
      }

      if (payload?.response?.data?.stack) {
        errorStack = payload.response.data.stack;

        errorStack = `${errorStack.slice(0, 100)} ${errorStack.slice(100)}`;
      } else if (payload?.stack) {
        errorStack = payload.stack;

        errorStack = `${errorStack.slice(0, 100)} ${errorStack.slice(100)}`;
      }

      if (payload?.response?.data?.lineNumber) {
        errorLineNumber = payload.response.data.lineNumber;
      } else if (payload?.lineNumber) {
        errorLineNumber = payload.message;
      }

      if (payload?.response?.data?.error && typeof payload?.response?.data?.error === 'string') {
        errorTitle = payload.response.data.error;
      } else if (payload?.response?.data?.name) {
        errorTitle = payload.response.data.name;
      } else if (payload?.name) {
        errorTitle = payload.name;
      }

      context.commit('SET_ERROR_TITLE', errorTitle);

      context.commit('SET_ERROR_MESSAGE', errorMessage);

      context.commit('SET_ERROR_FILE_NAME', errorFileName);

      context.commit('SET_ERROR_LINE_NUMBER', errorLineNumber);

      context.commit('SET_ERROR_STACK', errorStack);
    },

    clearError: (context) => {
      context.commit('SET_ERROR_TITLE', '');

      context.commit('SET_ERROR_MESSAGE', '');

      context.commit('SET_ERROR_FILE_NAME', '');

      context.commit('SET_ERROR_LINE_NUMBER', '');

      context.commit('SET_ERROR_STACK', '');
    },

    setMetaDescriptionAndDocumentTitle: (context, {
      title, description,
    }) => {
      context.commit('SET_DOCUMENT_TITLE', title);

      context.commit('SET_META_DESCRIPTION', description);

      document.title = title;

      let meta = document.querySelector('meta[name="description"]');

      if (!meta) {
        meta = document.createElement('meta');

        meta.name = 'description';

        document
          .querySelectorAll('head')[0]
          .appendChild(meta)
          .setAttribute('content', description);
      } else {
        meta.content = description;
      }
    },
  },

  getters: {
    errorMessage: (state) => state.errorMessage,

    errorTitle: (state) => state.errorTitle,

    errorFileName: (state) => state.errorFileName,

    errorLineNumber: (state) => state.errorLineNumber,

    errorStack: (state) => state.errorStack,
  },
};
