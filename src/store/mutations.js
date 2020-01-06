import {sessionSet,sessionGet} from 'utils/cache';

const mutations = {
  SET_USER (state, user) {
    state.user = user;
    sessionSet.setItem('user', user);
  },
  SET_TOKEN (state, token) {
    state.token = token;
    sessionGet.setItem('token', token);
  }
};

export default mutations;

