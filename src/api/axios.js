import axios from 'axios'
import cookie from 'js-cookie'

const token = cookie.get('token')

const api = axios.create({
  baseURL: 'http://192.168.100.5:8080',
  headers: token ? { Authorization: `Bearer ${token}`} : {}
})

export default api
