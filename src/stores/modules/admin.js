import { defineStore } from 'pinia'
import { ref } from 'vue'
import adminService from '@/services/admin.service'
import { useNotification } from '@/composables/useNotification'

export const useAdminStore = defineStore('admin', () => {
  const { showNotification } = useNotification()

  const getDashboardStats = async () => {
    try {
      const response = await adminService.getDashboardStats()
      return response
    } catch (error) {
      showNotification('Failed to load admin stats', 'error')
      return {
        total_users: 0,
        total_tasks: 0,
        pending_tasks: 0,
      }
    }
  }

  return {
    getDashboardStats,
  }
})
