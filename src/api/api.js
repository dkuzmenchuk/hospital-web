import api from '@/api/axios'

export default {
  registration: credentials => api.post('/registration', credentials),
  login: credentials => api.post('/signin', credentials),

  profile: () => api.get('/profile'),

  specializations: () => api.get('/specializations'),
  doctors: specialization => api.get(`/specializations/${specialization}`),
  time: (specialization, doctor) => api.post('/time', { specialization, doctor }),

  createOrder: data => api.post('/order', data),
  listOrders: (status) => api.get('/order', { params: { status } })
}
