import api from './api'

const getDashboardStats = async () => {
  const response = await api.get('/admin/stats')
  return response.data
}

const getAllUsers = async () => {
  const response = await api.get('/admin/users')
  return response.data
}

export default {
  getDashboardStats,
  getAllUsers,
}
