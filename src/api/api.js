import api from '@/api/axios'

export default {
  registration: credentials => api.post('/registration', credentials),
  login: credentials => api.post('/signin', credentials),

  profile: () => api.get('/profile'),
  updateProfile: data => api.post('/profile', data),
  updatePassword: data => api.post('/updatePassword', data),

  specializations: () => api.get('/specializations'),
  doctors: specialization => api.get(`/specializations/${specialization}`),
  time: (specialization, doctor) => api.post('/time', { specialization, doctor }),

  analyseTypesList: () => api.get('/analyseTypes'),
  analyses: analyseType => api.get(`/analyseTypes/${analyseType}`),
  analysesTime: (analyseType, analyse) => api.post('/analyseTime', { analyseType, analyse }),

  createOrder: data => api.post('/order', data),
  listOrders: status => api.get('/order', { params: { status } }),
  cancelOrder: id => api.post(`/order/${id}/cancel`),
  updateOrder: (id, data) => api.post(`/order/${id}`, data),
  order: id => api.get(`/order/${id}`),
  missedOrder: id => api.post(`/order/${id}/missed`),

  createDoctor: credentials => api.post('/doctor', credentials),
}
