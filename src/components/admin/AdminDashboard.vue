<template>
  <div>
    <AppNavbar />
    <div class="container">
      <h1 class="mt-20">Admin Dashboard</h1>
      <div class="card">
        <div class="dashboard-stats">
          <div class="stat-card">
            <h3>Total Users</h3>
            <p>{{ stats.total_users || 0 }}</p>
          </div>
          <div class="stat-card">
            <h3>Total Tasks</h3>
            <p>{{ stats.total_tasks || 0 }}</p>
          </div>
          <div class="stat-card">
            <h3>Pending Tasks</h3>
            <p>{{ stats.pending_tasks || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '@/stores/modules/admin'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const stats = ref({
      total_users: 0,
      total_tasks: 0,
      pending_tasks: 0,
    })
    const loading = ref(true)
    const adminStore = useAdminStore()

    const fetchStats = async () => {
      try {
        const response = await adminStore.getDashboardStats()
        stats.value = response.data
      } catch (error) {
        console.error('Admin stats error:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchStats)

    return { stats, loading }
  },
}
</script>

<style scoped>
.dashboard-stats {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.stat-card {
  background: var(--secondary-color);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
}

.stat-card h3 {
  margin-bottom: 10px;
  color: var(--dark-color);
}

.stat-card p {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.quick-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}
</style>
