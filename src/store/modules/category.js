import * as types from '../types';

const state = {c: 1};

const getters = {};

const mutations = {
  [types.ADD_ONE](state, rootState) {
    console.log(rootState);
    state.c += 1;
  },
};

const actions = {};


export default {
  state,
  actions,
  getters,
  mutations,
};
