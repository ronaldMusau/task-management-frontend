<template>
  <div>
    <AppNavbar />
    <div class="container">
      <h1 class="mt-20">Welcome, {{ user.name }}</h1>
      <div class="card">
        <div class="dashboard-stats">
          <div class="stat-card">
            <h3>Total Tasks</h3>
            <p>{{ stats.total_tasks || 0 }}</p>
          </div>
          <div class="stat-card">
            <h3>Pending Tasks</h3>
            <p>{{ stats.pending_tasks || 0 }}</p>
          </div>
          <div class="stat-card">
            <h3>Completed Tasks</h3>
            <p>{{ stats.completed_tasks || 0 }}</p>
          </div>
        </div>
      </div>
      <div class="card mt-20">
        <h2>Recent Tasks</h2>
        <div v-if="loading">Loading tasks...</div>
        <table v-else class="table">
          <!-- Table content same as before -->
        </table>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/modules/auth'
import { useTaskStore } from '@/stores/modules/tasks'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const user = ref({})
    const stats = ref({
      total_tasks: 0,
      pending_tasks: 0,
      completed_tasks: 0,
    })
    const recentTasks = ref([])
    const loading = ref(true)
    const authStore = useAuthStore()

    const fetchData = async () => {
      try {
        await authStore.fetchUser()
        user.value = authStore.user

        stats.value = Response.data
        recentTasks.value = Response.data
      } catch (error) {
        console.error('Dashboard error:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchData)

    return { user, stats, recentTasks, loading }
  },
}
</script>

<style scoped>
.actions {
  display: flex;
  gap: 10px;
}
</style>
