import api from '@/api/axios'

export default {
  registration: credentials => api.post('/registration', credentials),
  login: credentials => api.post('/signin', credentials),

  profile: () => api.get('/profile'),

  specializations: () => api.get('/specializations'),
  doctors: specialization => api.get(`/specializations/${specialization}`)
}
