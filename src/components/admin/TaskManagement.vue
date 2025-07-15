<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <div class="header">
          <h2>Task Management</h2>
          <router-link to="/admin/tasks/create" class="btn">Create Task</router-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Assignee</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td>{{ task.id }}</td>
              <td>{{ task.title }}</td>
              <td>{{ task.assignee.name }}</td>
              <td>{{ formatDate(task.deadline) }}</td>
              <td>
                <span :class="statusClass(task.status)">{{ task.status }}</span>
              </td>
              <td>
                <router-link :to="`/admin/tasks/edit/${task.id}`" class="btn-secondary"
                  >Edit</router-link
                >
                <button @click="deleteTask(task.id)" class="btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useNotification } from '@/composables/useNotification'
import { useTaskStore } from '@/stores/modules/tasks'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const tasks = ref([])
    const taskStore = useTaskStore()
    const { showNotification } = useNotification()

    const fetchTasks = async () => {
      try {
        const response = await taskStore.getAllTasks()
        tasks.value = response.tasks
      } catch {
        showNotification('Failed to fetch tasks', 'error')
      }
    }

    const deleteTask = async (id) => {
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          await taskStore.deleteTask(id)
          showNotification('Task deleted successfully', 'success')
          fetchTasks()
        } catch {
          showNotification('Failed to delete task', 'error')
        }
      }
    }

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

    onMounted(fetchTasks)

    return { tasks, deleteTask, formatDate, statusClass }
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

.btn-secondary,
.btn-danger {
  padding: 5px 10px;
  margin-right: 5px;
}
</style>
