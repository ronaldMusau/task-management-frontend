import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import adminAuthService from '@/services/adminAuth.service'
import { useNotification } from '@/composables/useNotification'

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const admin = ref(null)
  const token = ref(localStorage.getItem('adminToken'))
  const isAuthenticated = ref(!!token.value)
  const router = useRouter()
  const { showNotification } = useNotification()

  const setAuth = (adminData, authToken) => {
    admin.value = adminData
    token.value = authToken
    isAuthenticated.value = true
    localStorage.setItem('adminToken', authToken)
  }

  const login = async (credentials) => {
    const response = await adminAuthService.login(credentials)
    setAuth(response.admin, response.token)
    showNotification('Admin login successful!', 'success')
    router.push('/admin/dashboard')
  }

  const logout = async () => {
    await adminAuthService.logout()
    admin.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('adminToken')
    showNotification('Logged out successfully', 'success')
  }

  const fetchAdmin = async () => {
    try {
      const response = await adminAuthService.me()
      admin.value = response
    } catch (error) {
      logout()
      throw error
    }
  }

  return {
    admin,
    token,
    isAuthenticated,
    login,
    logout,
    fetchAdmin,
  }
})
