import { SET_USER } from "../mutation-types";

const state = {
  user: undefined
}

const mutations = {
  [SET_USER] (state, value) {
    state.user = value;
  }
}

export default {
  state,
  mutations
}
