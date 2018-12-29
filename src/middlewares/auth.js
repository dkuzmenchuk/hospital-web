import cookie from 'js-cookie'

export default async function auth({ next, router, store }) {
  if (!cookie.get('token')) {
    return router.push('login')
  }

  await store.dispatch('profile')

  return await next()
}
