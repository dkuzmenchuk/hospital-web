import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Form from './views/Form.vue'
import Doctors from './views/Doctors.vue'
import Specializations from './views/Specializations.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/Registration.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/specializations',
      name: 'specializations',
      component: Specializations,
      children: [
        {
          path: ':specialization',
          name: 'doctors',
          component: Doctors
        }
      ]
    }
  ]
})
