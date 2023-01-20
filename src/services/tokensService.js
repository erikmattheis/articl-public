import VueCookies from 'vue-cookies';
import axios from 'axios';
import store from '@/store';
import router from '@/router';

const getAccessTokenExpires = () => {
  const accessTokenExpires = VueCookies.get('accessTokenExpires');

  if (accessTokenExpires) {
    store.dispatch('tokens/accessTokenExpires', accessTokenExpires);
  }

  return accessTokenExpires;
};
const getAccessTokenValue = () => {
  const accessTokenValue = VueCookies.get('accessTokenValue');

  if (accessTokenValue) {
    store.dispatch('tokens/accessTokenValue', accessTokenValue);
  }

  return accessTokenValue;
};
const getRefreshTokenExpires = () => {
  const refreshTokenExpires = VueCookies.get(
    'refreshTokenExpires',
  );

  if (refreshTokenExpires) {
    store.dispatch('tokens/refreshTokenExpires', refreshTokenExpires);
  }

  return refreshTokenExpires;
};
const getRefreshTokenValue = () => {
  const refreshTokenValue = VueCookies.get('refreshTokenValue');

  if (refreshTokenValue) {
    store.dispatch('tokens/refreshTokenValue', refreshTokenValue);
  }

  return refreshTokenValue;
};
const setTokensInVuex = (val) => {
  if (val?.access?.token) {
    store.dispatch('tokens/accessTokenValue', val.access.token);

    store.dispatch('tokens/accessTokenExpires', val.access.expires);

    store.dispatch('tokens/refreshTokenValue', val.refresh.token);

    store.dispatch('tokens/refreshTokenExpires', val.refresh.expires);
  }
};
const setTokensInLocalStorage = (val) => {
  if (val?.access?.token) {
    VueCookies.set('accessTokenValue', val.access.token);

    VueCookies.set('accessTokenExpires', val.access.expires);

    VueCookies.set('refreshTokenValue', val.refresh.token);

    VueCookies.set('refreshTokenExpires', val.refresh.expires);
  }
};
const convertStringDatesToMS = (tokens) => {
  const result = JSON.parse(JSON.stringify(tokens));

  result.access.expires = Date.parse(
    tokens.access.expires,
  );

  result.refresh.expires = Date.parse(
    tokens.refresh.expires,
  );

  return result;
};
const setTokens = (tokens) => {
  const tokensMS = convertStringDatesToMS(tokens);

  setTokensInLocalStorage(tokensMS);

  setTokensInVuex(tokensMS);
};

async function renewSession() {
  try {
    // send request to your authentication server to exchange the refresh token for a new access token
    const refreshToken = getRefreshTokenValue();
    const { data } = await axios.post('/auth/refresh-tokens', { refreshToken });
    // update the access token and refresh token expiry
    console.log(data);
    setTokens(data);
    /*
    access_token = data.access_token;
    refresh_token = data.refresh_token;
    access_token_expiry = Date.now() + (data.expires_in * 1000);
    refresh_token_expiry = Date.now() + (data.refresh_expires_in * 1000);
    */
    // set the new access token in the axios headers
    const accessToken = getAccessTokenValue();
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } catch (error) {
    // session renewal failed, redirect to login page
    // logout();
    router.push({ name: 'login' });
  }
}

export {
  convertStringDatesToMS,
  getAccessTokenExpires,
  getAccessTokenValue,
  getRefreshTokenExpires,
  getRefreshTokenValue,
  setTokens,
  setTokensInLocalStorage,
  setTokensInVuex,
  renewSession,

};
