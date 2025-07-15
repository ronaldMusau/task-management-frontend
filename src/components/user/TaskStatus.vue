<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>Update Task Status</h2>
        <form @submit.prevent="updateStatus">
          <div class="form-group">
            <label>Task Title</label>
            <input type="text" class="form-control" :value="task.title" readonly />
          </div>
          <div class="form-group">
            <label>Current Status</label>
            <input type="text" class="form-control" :value="task.status" readonly />
          </div>
          <div class="form-group">
            <label>New Status</label>
            <select class="form-control" v-model="newStatus" required>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" class="btn">Update Status</button>
          <router-link :to="`/tasks/${task.id}`" class="btn-secondary">Cancel</router-link>
          <div v-if="error" class="alert alert-danger mt-20">{{ error }}</div>
          <div v-if="success" class="alert alert-success mt-20">{{ success }}</div>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/modules/tasks'
import { useNotification } from '@/composables/useNotification'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const taskStore = useTaskStore()
    const { showNotification } = useNotification()

    const task = ref({})
    const newStatus = ref('')
    const error = ref('')
    const success = ref('')

    const fetchTask = async () => {
      try {
        task.value = await taskStore.getTaskById(route.params.id)
        newStatus.value = task.value.status
      } catch {
        showNotification('Failed to fetch task', 'error')
        router.push('/tasks')
      }
    }

    const updateStatus = async () => {
      try {
        await taskStore.updateTaskStatus(route.params.id, { status: newStatus.value })
        success.value = 'Task status updated successfully'
        showNotification(success.value, 'success')
        setTimeout(() => {
          router.push(`/tasks/${route.params.id}`)
        }, 1500)
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to update task status'
        showNotification(error.value, 'error')
      }
    }

    onMounted(fetchTask)

    return { task, newStatus, error, success, updateStatus }
  },
}
</script>

<style scoped>
.btn-secondary {
  margin-left: 10px;
  background: var(--secondary-color);
}
</style>
