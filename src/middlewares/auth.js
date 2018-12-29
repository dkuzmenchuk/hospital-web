import cookie from 'js-cookie'

export default async function auth({ next, router }) {
  return cookie.get('token') ? await next() : router.push('login')
}
