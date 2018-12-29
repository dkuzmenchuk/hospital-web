import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'

import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  modules: {
    auth
  }
})

export default store
