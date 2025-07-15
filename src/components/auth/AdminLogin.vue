<template>
  <div class="container">
    <div class="card">
      <h2 class="text-center">Admin Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="form.password" required />
        </div>
        <div class="form-group">
          <label>Role</label>
          <select class="form-control" v-model="form.role" required>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" class="btn">Login</button>
        <p class="mt-20">Not an admin? <router-link to="/login">User login</router-link></p>
        <div v-if="error" class="alert alert-danger mt-20">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminAuthStore } from '@/stores/modules/adminAuth'
import { useNotification } from '@/composables/useNotification'

export default {
  setup() {
    const form = ref({
      email: '',
      password: '',
      role: 'admin',
    })
    const error = ref('')
    const router = useRouter()
    const adminAuthStore = useAdminAuthStore()
    const { showNotification } = useNotification()

    const handleLogin = async () => {
      try {
        await adminAuthStore.login(form.value)
        showNotification('Admin login successful!', 'success')
        router.push('/admin/dashboard')
      } catch (err) {
        error.value = err.response?.data?.message || 'Invalid admin credentials'
        showNotification(error.value, 'error')
      }
    }

    return { form, error, handleLogin }
  },
}
</script>
