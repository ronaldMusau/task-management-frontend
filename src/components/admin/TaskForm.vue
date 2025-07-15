<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>{{ isEdit ? 'Edit Task' : 'Create Task' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="form.title" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="form.description" required></textarea>
          </div>
          <div class="form-group">
            <label>Assignee</label>
            <select class="form-control" v-model="form.assigned_to" required>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} ({{ user.email }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Deadline</label>
            <input type="datetime-local" class="form-control" v-model="form.deadline" required />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="form.status" required>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" class="btn">{{ isEdit ? 'Update' : 'Create' }}</button>
          <router-link to="/admin/tasks" class="btn-secondary">Cancel</router-link>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/modules/tasks'
import { useUserStore } from '@/stores/modules/users'
import { useNotification } from '@/composables/useNotification'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const { showNotification } = useNotification()

    const form = ref({
      title: '',
      description: '',
      assigned_to: '',
      deadline: '',
      status: 'pending',
    })
    const users = ref([])
    const isEdit = computed(() => route.params.id !== undefined)

    const fetchUsers = async () => {
      try {
        users.value = await userStore.getAllUsers()
        if (users.value.length > 0) {
          form.value.assigned_to = users.value[0].id
        }
      } catch (error) {
        showNotification('Failed to fetch users', 'error')
      }
    }

    const fetchTask = async (id) => {
      try {
        const task = await taskStore.getTaskById(id)
        form.value = {
          title: task.title,
          description: task.description,
          assigned_to: task.assigned_to,
          deadline: task.deadline.split(' ')[0] + 'T' + task.deadline.split(' ')[1],
          status: task.status,
        }
      } catch (error) {
        showNotification('Failed to fetch task', 'error')
        router.push('/admin/tasks')
      }
    }

    const handleSubmit = async () => {
      try {
        if (isEdit.value) {
          await taskStore.updateTask(route.params.id, form.value)
          showNotification('Task updated successfully', 'success')
        } else {
          await taskStore.createTask(form.value)
          showNotification('Task created successfully', 'success')
        }
        router.push('/admin/tasks')
      } catch (error) {
        showNotification(error.response?.data?.message || 'Operation failed', 'error')
      }
    }

    onMounted(async () => {
      await fetchUsers()
      if (isEdit.value) {
        await fetchTask(route.params.id)
      }
    })

    return { form, users, isEdit, handleSubmit }
  },
}
</script>

<style scoped>
.btn-secondary {
  margin-left: 10px;
  background: var(--secondary-color);
}
</style>
