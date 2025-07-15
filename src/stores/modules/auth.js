import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/auth.service'
import { useNotification } from '@/composables/useNotification'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isAuthenticated = ref(!!token.value)
  const router = useRouter()
  const { showNotification } = useNotification()

  const setAuth = (userData, authToken) => {
    user.value = userData
    token.value = authToken
    isAuthenticated.value = true
    localStorage.setItem('token', authToken)
  }

  const login = async (credentials) => {
    const response = await authService.login(credentials)
    setAuth(response.user, response.token)
    showNotification('Login successful!', 'success')
    router.push('/dashboard')
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    return response
  }

  const logout = async () => {
    await authService.logout()
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    showNotification('Logged out successfully', 'success')
  }

  const fetchUser = async () => {
    try {
      const response = await authService.me()
      user.value = response
    } catch (error) {
      logout()
      throw error
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData)
      user.value = response
      showNotification('Profile updated successfully', 'success')
      return response
    } catch (error) {
      showNotification(error.response?.data?.message || 'Failed to update profile', 'error')
      throw error
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
  }
})
