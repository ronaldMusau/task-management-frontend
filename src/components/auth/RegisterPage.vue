<template>
  <div class="container">
    <div class="card">
      <h2 class="text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="form.password" required />
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            class="form-control"
            v-model="form.password_confirmation"
            required
          />
        </div>
        <button type="submit" class="btn">Register</button>
        <p class="mt-20">Already have an account? <router-link to="/login">Login</router-link></p>
        <div v-if="error" class="alert alert-danger mt-20">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-20">{{ success }}</div>
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
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })
    const error = ref('')
    const success = ref('')
    const router = useRouter()
    const authStore = useAuthStore()
    const { showNotification } = useNotification()

    const handleRegister = async () => {
      if (form.value.password !== form.value.password_confirmation) {
        error.value = 'Passwords do not match'
        return
      }

      try {
        await authStore.register(form.value)
        success.value = 'Registration successful! Please login.'
        showNotification(success.value, 'success')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed'
        showNotification(error.value, 'error')
      }
    }

    return { form, error, success, handleRegister }
  },
}
</script>
