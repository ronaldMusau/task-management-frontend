import { defineStore } from 'pinia'
import { ref } from 'vue'
import taskService from '@/services/task.service'
import { useNotification } from '@/composables/useNotification'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const currentTask = ref(null)
  const { showNotification } = useNotification()

  const getAllTasks = async () => {
    try {
      const response = await taskService.getAllTasks()
      tasks.value = response
      return response
    } catch (error) {
      showNotification('Failed to fetch tasks', 'error')
      throw error
    }
  }

  const getUserTasks = async () => {
    try {
      const response = await taskService.getUserTasks()
      tasks.value = response
      return response.data
    } catch (error) {
      showNotification('Failed to fetch your tasks', 'error')
      throw error
    }
  }

  const getTaskById = async (id) => {
    try {
      const response = await taskService.getTaskById(id)
      currentTask.value = response
      return response
    } catch (error) {
      showNotification('Failed to fetch task details', 'error')
      throw error
    }
  }

  const createTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData)
      showNotification('Task created successfully', 'success')
      return response
    } catch (error) {
      showNotification('Failed to create task', 'error')
      throw error
    }
  }

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskService.updateTask(id, taskData)
      showNotification('Task updated successfully', 'success')
      return response
    } catch (error) {
      showNotification('Failed to update task', 'error')
      throw error
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id)
      showNotification('Task deleted successfully', 'success')
    } catch (error) {
      showNotification('Failed to delete task', 'error')
      throw error
    }
  }

  const updateTaskStatus = async (id, statusData) => {
    try {
      const response = await taskService.updateTaskStatus(id, statusData)
      showNotification('Task status updated successfully', 'success')
      return response
    } catch (error) {
      showNotification('Failed to update task status', 'error')
      throw error
    }
  }

  const bulkAssignTasks = async (taskData) => {
    try {
      const response = await taskService.bulkAssignTasks(taskData)
      showNotification('Tasks assigned successfully', 'success')
      return response
    } catch (error) {
      showNotification('Failed to assign tasks', 'error')
      throw error
    }
  }

  const getUserStats = async () => {
    try {
      const response = await taskService.getUserStats()
      return response.data
    } catch (error) {
      showNotification('Failed to load stats', 'error')
      return {
        total_tasks: 0,
        pending_tasks: 0,
        completed_tasks: 0,
      }
    }
  }

  const getRecentTasks = async () => {
    try {
      const response = await taskService.getRecentTasks()
      return response.tasks
    } catch (error) {
      showNotification('Failed to load recent tasks', 'error')
      return []
    }
  }

  return {
    tasks,
    currentTask,
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
})
