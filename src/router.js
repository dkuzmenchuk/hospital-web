import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Form from './views/Form.vue'
import Doctors from './views/Doctors.vue'
import Specializations from './views/Specializations.vue'
import ClientCard from './views/ClientCard.vue'
import CardReport from './views/CardReport.vue'
import Orders from './views/Orders.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Главная'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Авторизация'
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/Registration.vue'),
      meta: {
        title: 'Регистрация'
      }
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
      meta: {
        title: 'Запись на прием'
      }
    },
    {
      path: '/card',
      name: 'card',
      component: ClientCard,
      meta: {
        title: 'Электронная карточка'
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        title: 'Ближайшие посещения'
      }
    },
    {
      path: '/card-report',
      name: 'card-report',
      component: CardReport,
      meta: {
        title: 'Отчет о приеме врача'
      }
    },
    {
      path: '/specializations',
      name: 'specializations',
      component: Specializations,
      meta: {
        title: 'Специализации врачей',
      },
      children: [
        {
          path: ':specialization',
          name: 'doctors',
          component: Doctors,
          meta: {
            title: 'Список врачей'
          }
        }
      ]
    }
  ]
})
