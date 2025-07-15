import api from './api'

const login = async (credentials) => {
  const response = await api.post('/admin/auth/login', credentials)
  return response.data
}

const register = async (adminData) => {
  const response = await api.post('/admin/auth/register', adminData)
  return response.data
}

const logout = async () => {
  const response = await api.post('/admin/auth/logout')
  return response.data
}

const me = async () => {
  const response = await api.get('/admin/auth/me')
  return response.data
}

export default {
  login,
  register,
  logout,
  me,
}
