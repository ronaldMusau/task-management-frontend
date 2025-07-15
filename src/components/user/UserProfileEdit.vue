<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>Edit Profile</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label>Current Password</label>
            <input type="password" class="form-control" v-model="form.current_password" />
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" class="form-control" v-model="form.new_password" />
          </div>
          <div class="form-group">
            <label>Confirm New Password</label>
            <input type="password" class="form-control" v-model="form.new_password_confirmation" />
          </div>
          <button type="submit" class="btn">Update Profile</button>
          <router-link to="/profile" class="btn-secondary">Cancel</router-link>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useNotification } from '@/composables/useNotification'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const form = ref({
      name: '',
      email: '',
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    })
    const router = useRouter()
    const authStore = useAuthStore()
    const { showNotification } = useNotification()

    onMounted(async () => {
      try {
        await authStore.fetchUser()
        form.value.name = authStore.user.name
        form.value.email = authStore.user.email
      } catch (error) {
        showNotification('Failed to fetch user profile', 'error')
      }
    })

    const handleSubmit = async () => {
      try {
        await authStore.updateProfile(form.value)
        showNotification('Profile updated successfully', 'success')
        router.push('/profile')
      } catch (error) {
        showNotification(error.response?.data?.message || 'Failed to update profile', 'error')
      }
    }

    return { form, handleSubmit }
  },
}
</script>

<style scoped>
.btn-secondary {
  margin-left: 10px;
  background: var(--secondary-color);
}
</style>
