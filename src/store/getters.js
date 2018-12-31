export const isLoggedIn = state => Boolean(state.auth.user)

export const isClient = state => isLoggedIn(state) && state.auth.user.role === 'ROLE_USER'
export const isDoctor = state => isLoggedIn(state) && state.auth.user.role === 'ROLE_DOCTOR'
export const isAdmin = state => isLoggedIn(state) && state.auth.user.role === 'ROLE_ADMIN'
