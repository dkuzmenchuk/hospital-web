export default async function auth({ next, router, store }) {
  return store.getters.isClient ? next() : router.push({ name: 'login' })
}
