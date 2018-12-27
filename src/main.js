import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal
  }
})
Vue.config.productionTip = false

import moment from 'moment'
moment.locale('ru')

Vue.filter('hm_time', value => moment(value, 'HH:mm:ss').format('HH:mm'))
Vue.filter('formatted_date', value => moment(value, 'YYYY-MM-DD').format('DD MMM YYYY'))

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
