<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>Task Details</h2>
        <div class="task-details">
          <div class="detail-item">
            <label>Title:</label>
            <span>{{ task.title }}</span>
          </div>
          <div class="detail-item">
            <label>Description:</label>
            <span>{{ task.description }}</span>
          </div>
          <div class="detail-item">
            <label>Status:</label>
            <span :class="statusClass(task.status)">{{ task.status }}</span>
          </div>
          <div class="detail-item">
            <label>Deadline:</label>
            <span>{{ formatDate(task.deadline) }}</span>
          </div>
          <div class="detail-item">
            <label>Assigned To:</label>
            <span>{{ task.assignee?.name || 'Unassigned' }}</span>
          </div>
        </div>
        <div class="actions">
          <router-link to="/tasks" class="btn-secondary">Back to Tasks</router-link>
          <router-link v-if="isAssignee" :to="`/tasks/${task.id}/status`" class="btn">
            Update Status
          </router-link>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/modules/tasks'
import { useAuthStore } from '@/stores/modules/auth'
import { useNotification } from '@/composables/useNotification'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const route = useRoute()
    const task = ref({})
    const taskStore = useTaskStore()
    const authStore = useAuthStore()
    const { showNotification } = useNotification()

    const isAssignee = computed(() => {
      return task.value.assigned_to === authStore.user?.id
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    const statusClass = (status) => {
      return {
        'status-pending': status === 'pending',
        'status-in-progress': status === 'in_progress',
        'status-completed': status === 'completed',
      }
    }

    onMounted(async () => {
      try {
        task.value = await taskStore.getTaskById(route.params.id)
      } catch (error) {
        showNotification('Failed to fetch task details', 'error')
      }
    })

    return { task, isAssignee, formatDate, statusClass }
  },
}
</script>

<style scoped>
.task-details {
  margin-bottom: 20px;
}

.detail-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.detail-item label {
  font-weight: bold;
  margin-right: 10px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.status-pending {
  color: var(--warning-color);
  font-weight: bold;
}

.status-in-progress {
  color: var(--info-color);
  font-weight: bold;
}

.status-completed {
  color: var(--success-color);
  font-weight: bold;
}
</style>
