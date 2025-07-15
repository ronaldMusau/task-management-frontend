import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '@/services/user.service'
import { useNotification } from '@/composables/useNotification'

export const useUserStore = defineStore('users', () => {
  const users = ref([])
  const currentUser = ref(null)
  const { showNotification } = useNotification()

  const getAllUsers = async () => {
    try {
      const response = await userService.getAllUsers()
      return response.users
    } catch (error) {
      showNotification('Failed to fetch users', 'error')
      throw error
    }
  }

  const getUserById = async (id) => {
    try {
      const response = await userService.getUserById(id)
      currentUser.value = response
      return response
    } catch (error) {
      showNotification('Failed to fetch user details', 'error')
      throw error
    }
  }

  const createUser = async (userData) => {
    try {
      const response = await userService.createUser(userData)
      showNotification('User created successfully', 'success')
      return response
    } catch (error) {
      showNotification('Failed to create user', 'error')
      throw error
    }
  }

  const updateUser = async (id, userData) => {
    try {
      const response = await userService.updateUser(id, userData)
      showNotification('User updated successfully', 'success')
      return response
    } catch (error) {
      showNotification('Failed to update user', 'error')
      throw error
    }
  }

  const deleteUser = async (id) => {
    try {
      await userService.deleteUser(id)
      showNotification('User deleted successfully', 'success')
    } catch (error) {
      showNotification('Failed to delete user', 'error')
      throw error
    }
  }

  const findByEmail = async (email) => {
    try {
      const response = await userService.findByEmail(email)
      return response
    } catch (error) {
      showNotification('User not found', 'error')
      throw error
    }
  }

  return {
    users,
    currentUser,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    findByEmail,
  }
})
