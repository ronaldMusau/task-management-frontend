<template>
  <div class="container">
    <div class="card">
      <h2 class="text-center">User Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="form.password" required />
        </div>
        <button type="submit" class="btn">Login</button>
        <p class="mt-20">
          Don't have an account? <router-link to="/register">Register</router-link>
        </p>
        <p>Admin? <router-link to="/admin/login">Login here</router-link></p>
        <div v-if="error" class="alert alert-danger mt-20">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useNotification } from '@/composables/useNotification'

export default {
  setup() {
    const form = ref({
      email: '',
      password: '',
    })
    const error = ref('')
    const router = useRouter()
    const authStore = useAuthStore()
    const { showNotification } = useNotification()

    const handleLogin = async () => {
      try {
        await authStore.login(form.value)
        showNotification('Login successful!', 'success')
        router.push('/dashboard')
      } catch (err) {
        error.value = err.response?.data?.message || 'Invalid credentials'
        showNotification(error.value, 'error')
      }
    }

    return { form, error, handleLogin }
  },
}
</script>
