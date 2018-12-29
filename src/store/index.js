import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    auth
  }
})

export default store
