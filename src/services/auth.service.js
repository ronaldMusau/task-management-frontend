import api from './api'

const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  localStorage.setItem('token', response.data.token)
  if (response.data.refreshToken) {
    localStorage.setItem('refreshToken', response.data.refreshToken)
  }
  return response.data
}

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) throw new Error('No refresh token available')
  const response = await api.post('/auth/refresh', { refreshToken })
  localStorage.setItem('token', response.data.token)
  if (response.data.refreshToken) {
    localStorage.setItem('refreshToken', response.data.refreshToken)
  }
  return response.data
}

const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

const logout = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}

const me = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData)
  return response.data
}

export default {
  login,
  register,
  logout,
  me,
  updateProfile,
  refreshToken,
}
