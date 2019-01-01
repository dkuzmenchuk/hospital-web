import Vue from 'vue'

import Router from 'vue-router'

import Home from './views/Home.vue'
import Form from './views/Form.vue'
import Doctors from './views/Doctors.vue'
import Specializations from './views/Specializations.vue'
import ClientCard from './views/ClientCard.vue'
import CardReport from './views/CardReport.vue'
import ClientOrders from './views/ClientOrders.vue'
import DoctorOrders from './views/DoctorOrders.vue'
import Profile from './views/Profile.vue'
import UpdatePassword from './views/UpdatePassword.vue'
import CreateDoctor from './views/CreateDoctor.vue'
import WorkingTime from './views/WorkingTime.vue'

import store from './store'

import auth from './middlewares/auth'
import client from './middlewares/client'
import doctor from './middlewares/doctor'
import admin from './middlewares/admin'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Главная',
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Авторизация',
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/Registration.vue'),
      meta: {
        title: 'Регистрация',
      }
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
      meta: {
        title: 'Запись на прием',
        middleware: auth,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        title: 'Профиль',
        middleware: auth,
      }
    },
    {
      path: '/update-password',
      name: 'update-password',
      component: UpdatePassword,
      meta: {
        title: 'Обновление пароля',
        middleware: auth,
      }
    },
    {
      path: '/card',
      name: 'card',
      component: ClientCard,
      meta: {
        title: 'Электронная карточка',
        middleware: auth,
      }
    },
    {
      path: '/client-orders',
      name: 'client-orders',
      component: ClientOrders,
      meta: {
        title: 'Ближайшие посещения',
        middleware: [auth, client]
      }
    },
    {
      path: '/doctor-orders',
      name: 'doctor-orders',
      component: DoctorOrders,
      meta: {
        title: 'Ближайшие посещения',
        middleware: [auth, doctor]
      }
    },
    {
      path: '/orders/:id/card-report',
      name: 'card-report',
      component: CardReport,
      meta: {
        title: 'Отчет о приеме',
        middleware: auth,
      }
    },
    {
      path: '/create-doctor',
      name: 'create-doctor',
      component: CreateDoctor,
      meta: {
        title: 'Создание аккаунта',
        middleware: [auth, admin]
      }
    },
    {
      path: '/working-time',
      name: 'working-time',
      component: WorkingTime,
      meta: {
        title: 'Рабочее время',
        middleware: [auth, admin]
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

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
async function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return async (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = await nextFactory(context, middleware, index + 1)
    await subsequentMiddleware({...context, next: nextMiddleware})
  };
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      store,
      router,
      to,
    }
    const nextMiddleware = await nextFactory(context, middleware, 1)

    return await middleware[0]({...context, next: nextMiddleware})
  }

  return next()
});

export default router
