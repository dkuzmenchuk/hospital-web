import cookies from 'js-cookie'
import api from '@/api/api'

export const profile = async function ({ commit }) {
  const token = cookies.get('token')

  if (token) {
    const { data: profile} = await api.profile()

    if (profile) {
      commit('setUser', profile)
    }
  }
}
