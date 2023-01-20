import 'core-js/actual/array/group-by';

import axios from 'axios';
// import createAuthRefreshInterceptor from "axios-auth-refresh";
import { createApp } from 'vue';
import VueCookies from 'vue-cookies';

import { getAccessTokenValue, getRefreshTokenExpires } from '@/services/tokensService';

import App from './App.vue';
import router from './router';
import store from './store/index';

const app = createApp(App);

let baseURL = '';
let secure = true;

if (window.location.hostname === '192.168.1.130' || window.location.hostname === 'localhost') {
  baseURL = 'http://localhost:5000/v1';

  secure = false;
} else if (window.location.hostname === 'articl-vue-dev.herokuapp.com') {
  baseURL = 'https://articl-api-dev.herokuapp.com/v1';
} else {
  baseURL = 'https://api.articl.net/v1';
}

app.config.globalProperties.$http = axios.create({
  baseURL,
});

app.config.globalProperties.$http.interceptors.request.use(
  (request) => {
    const req = request;
    const accessTokenValue = getAccessTokenValue();

    if (accessTokenValue && req.url !== '/auth/refresh-tokens') {
      req.headers.Authorization = `Bearer ${accessTokenValue}`;
    }

    return Promise.resolve(req);
  },
  (error) => error,
);
/*
app.config.globalProperties.$http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) {
      if (
        accessTokenExpires()
        && refreshTokenExpires()
        && Date.now() > refreshTokenExpires
      ) {
        // refresh token has expired, redirect to login page
        // logout();
        router.push({ name: 'login' });
        return Promise.reject(error);
      }

      // try to renew the session
      try {
        await renewSession();
        // retry the original request
        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
*/
app.config.globalProperties.$http.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      // check if refresh token is still valid
      if (getRefreshTokenExpires() > Date.now()) {
        console.log('refresh token is still valid, renew the session');

        return store.dispatch('renewSession')
          .then(() => axios(error.config))
          .catch(() => {
            // session renewal failed, redirect to login page
            store.dispatch('logout');
            router.push({ name: 'login' });
          });
      }
      // refresh token is expired, redirect to login page
      store.dispatch('logout');
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  },
);

/*
const refreshAuthLogic = (failedRequest) => {

  return axios.post({
    method: "POST",
    url: `${baseURL}/auth/refresh-tokens`,
    data: {
      refreshToken: getRefreshTokenValue(),
    },
    skipAuthRefresh: true,
  })
    .then((tokens) => {

      setTokens(tokens.data);
      return Promise.resolve(failedRequest);

    });

};

/*
async function refreshAuthLogic(failedRequest) {

  if (!getRefreshTokenValue() || failedRequest.isRetry) {

    router.push({ name: "loginPage", query: { redirect: router.currentRoute.value.path } });
    return Promise.reject();

  }

  // does it need axios instance returned
  return axios({
    method: "POST",
    url: `${baseURL}/auth/refresh-tokens`,
    data: {
      refreshToken: getRefreshTokenValue(),
    },
  })
    .then((tokens) => {

      console.log("i am right here", tokens);
      // eslint-disable-next-line no-param-reassign
      failedRequest.response.config.headers.Authorization = `Bearer ${getAccessTokenValue()}`;

      // eslint-disable-next-line no-param-reassign
      failedRequest.isRetry = true;

      setTokens(tokens.data);

      return Promise.resolve();

    })
    .catch((error) => {

      console.log("catching error here", error);
      return Promise.reject(error);

    });

}
*/
// createAuthRefreshInterceptor(app.config.globalProperties.$http, refreshAuthLogic);

app.use(router);

app.use(VueCookies, {
  secure,
});

app.use(store);

app.mount('#app');
