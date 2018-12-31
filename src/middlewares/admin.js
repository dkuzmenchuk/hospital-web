export default async function auth({ next, router, store }) {
  return store.getters.isAdmin ? next() : router.push({ name: 'login' })
}
