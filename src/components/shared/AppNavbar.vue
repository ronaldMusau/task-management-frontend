<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="navbar-brand">Task Manager</router-link>
        <div class="navbar-links">
          <template v-if="isAuthenticated">
            <router-link v-if="isAdmin" to="/admin/dashboard" class="nav-link"
              >Dashboard</router-link
            >
            <router-link v-else to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link v-if="isAdmin" to="/admin/tasks" class="nav-link">Tasks</router-link>
            <router-link v-if="isAdmin" to="/admin/users" class="nav-link">Users</router-link>
            <router-link v-else to="/tasks" class="nav-link">My Tasks</router-link>
            <router-link v-if="isAdmin" to="/admin/profile" class="nav-link">Profile</router-link>
            <router-link v-else to="/profile" class="nav-link">Profile</router-link>
            <button @click="handleLogout" class="nav-link">Logout</button>
          </template>
          <template v-else>
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/register" class="nav-link">Register</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useAdminAuthStore } from '@/stores/modules/adminAuth'
import { useNotification } from '@/composables/useNotification'

export default {
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const adminAuthStore = useAdminAuthStore()
    const { showNotification } = useNotification()

    const isAuthenticated = computed(
      () => authStore.isAuthenticated || adminAuthStore.isAuthenticated,
    )
    const isAdmin = computed(() => adminAuthStore.isAuthenticated)

    const handleLogout = async () => {
      try {
        if (isAdmin.value) {
          await adminAuthStore.logout()
        } else {
          await authStore.logout()
        }
        showNotification('Logged out successfully', 'success')
        router.push('/login')
      } catch {
        showNotification('Failed to logout', 'error')
      }
    }

    return { isAuthenticated, isAdmin, handleLogout }
  },
}
</script>

<style scoped>
.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-links {
  display: flex;
  align-items: center;
}

.navbar-links button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-left: 20px;
}

.navbar-links button:hover {
  color: var(--primary-color);
}
</style>
