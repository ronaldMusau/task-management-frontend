<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <div class="header">
          <h2>Users Management</h2>
          <router-link to="/admin/users/create" class="btn">Add New User</router-link>
        </div>
        <div v-if="loading">Loading users...</div>
        <table v-else class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <router-link :to="`/admin/users/edit/${user.id}`" class="btn-secondary"
                  >Edit</router-link
                >
                <button @click="deleteUser(user.id)" class="btn-danger">Delete</button>
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
import { useUserStore } from '@/stores/modules/users'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const users = ref([])
    const loading = ref(true)
    const userStore = useUserStore()
    const { showNotification } = useNotification()

    const fetchUsers = async () => {
      try {
        const response = await userStore.getAllUsers()
        users.value = response.users
        loading.value = false
      } catch (error) {
        showNotification('Failed to fetch users', 'error')
        loading.value = false
      }
    }

    const deleteUser = async (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await userStore.deleteUser(id)
          showNotification('User deleted successfully', 'success')
          fetchUsers()
        } catch (error) {
          showNotification('Failed to delete user', 'error')
        }
      }
    }

    onMounted(fetchUsers)

    return { users, loading, deleteUser }
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

.table {
  margin-top: 20px;
}

.btn-secondary,
.btn-danger {
  padding: 5px 10px;
  margin-right: 5px;
}
</style>
