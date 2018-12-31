export default async function auth({ next, router, store }) {
  return store.getters.isDoctor ? next() : router.push({ name: 'login' })
}
