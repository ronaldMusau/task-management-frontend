import api from './api'

const getAllTasks = async () => {
  const response = await api.get('/tasks')
  return response.data
}

const getUserTasks = async () => {
  const response = await api.get('/tasks/user')
  return response.data
}

const getRecentTasks = async () => {
  const response = await api.get('/tasks/user/recent')
  return response.data
}

const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`)
  return response.data
}

const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData)
  return response.data
}

const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData)
  return response.data
}

const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`)
  return response.data
}

const updateTaskStatus = async (id, statusData) => {
  const response = await api.patch(`/tasks/${id}/status`, statusData)
  return response.data
}

const bulkAssignTasks = async (taskData) => {
  const response = await api.post('/tasks/bulk-assign', taskData)
  return response.data
}

const getUserStats = async () => {
  const response = await api.get('/tasks/user/stats')
  return response.data.data
}

export default {
  getAllTasks,
  getUserTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  bulkAssignTasks,
  getUserStats,
  getRecentTasks,
}
