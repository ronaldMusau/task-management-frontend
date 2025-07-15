<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>My Tasks</h2>
        <div class="filters">
          <select v-model="statusFilter" class="form-control">
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in filteredTasks" :key="task.id">
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>{{ formatDate(task.deadline) }}</td>
              <td>
                <span :class="statusClass(task.status)">{{ task.status }}</span>
              </td>
              <td>
                <router-link :to="`/tasks/${task.id}`" class="btn-secondary">View</router-link>
                <button @click="openStatusModal(task)" class="btn">Update Status</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AppFooter />

    <div v-if="showStatusModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeStatusModal">&times;</span>
        <h3>Update Task Status</h3>
        <form @submit.prevent="updateTaskStatus">
          <div class="form-group">
            <label>Status</label>
            <select v-model="selectedStatus" class="form-control" required>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" class="btn">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '@/stores/modules/tasks'
import { useNotification } from '@/composables/useNotification'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const tasks = ref([])
    const statusFilter = ref('all')
    const showStatusModal = ref(false)
    const selectedTask = ref(null)
    const selectedStatus = ref('pending')
    const taskStore = useTaskStore()
    const { showNotification } = useNotification()

    const fetchTasks = async () => {
      try {
        const response = await taskStore.getAllTasks()
        stats.value = response.data
      } catch {
        showNotification('Failed to fetch tasks', 'error')
      }
    }

    const filteredTasks = computed(() => {
      if (statusFilter.value === 'all') return tasks.value
      return tasks.value.filter((task) => task.status === statusFilter.value)
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

    const openStatusModal = (task) => {
      selectedTask.value = task
      selectedStatus.value = task.status
      showStatusModal.value = true
    }

    const closeStatusModal = () => {
      showStatusModal.value = false
    }

    const updateTaskStatus = async () => {
      try {
        await taskStore.updateTaskStatus(selectedTask.value.id, { status: selectedStatus.value })
        showNotification('Task status updated successfully', 'success')
        fetchTasks()
        closeStatusModal()
      } catch {
        showNotification('Failed to update task status', 'error')
      }
    }

    onMounted(fetchTasks)

    return {
      tasks,
      statusFilter,
      filteredTasks,
      showStatusModal,
      selectedStatus,
      formatDate,
      statusClass,
      openStatusModal,
      closeStatusModal,
      updateTaskStatus,
    }
  },
}
</script>

<style scoped>
.filters {
  margin-bottom: 20px;
  width: 200px;
}

.btn-secondary {
  padding: 5px 10px;
  margin-right: 5px;
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
