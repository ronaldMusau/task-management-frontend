<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>Bulk Assign Tasks</h2>
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
            <label>Deadline</label>
            <input type="datetime-local" class="form-control" v-model="form.deadline" required />
          </div>
          <div class="form-group">
            <label>Select Users</label>
            <div v-for="user in users" :key="user.id" class="user-checkbox">
              <input
                type="checkbox"
                :id="'user-' + user.id"
                :value="user.id"
                v-model="form.user_ids"
              />
              <label :for="'user-' + user.id">{{ user.name }} ({{ user.email }})</label>
            </div>
          </div>
          <button type="submit" class="btn">Assign Tasks</button>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/modules/tasks'
import { useUserStore } from '@/stores/modules/users'
import { useNotification } from '@/composables/useNotification'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const form = ref({
      title: '',
      description: '',
      deadline: '',
      user_ids: [],
    })
    const users = ref([])
    const router = useRouter()
    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const { showNotification } = useNotification()

    const fetchUsers = async () => {
      try {
        users.value = await userStore.getAllUsers()
      } catch (error) {
        showNotification('Failed to fetch users', 'error')
      }
    }

    const handleSubmit = async () => {
      try {
        await taskStore.bulkAssignTasks(form.value)
        showNotification('Tasks assigned successfully', 'success')
        router.push('/admin/tasks')
      } catch (error) {
        showNotification('Failed to assign tasks', 'error')
      }
    }

    onMounted(fetchUsers)

    return { form, users, handleSubmit }
  },
}
</script>

<style scoped>
.user-checkbox {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.user-checkbox input {
  margin-right: 10px;
}
</style>
