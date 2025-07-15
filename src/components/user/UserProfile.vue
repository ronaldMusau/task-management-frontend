<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>User Profile</h2>
        <div class="profile-info">
          <div class="info-item">
            <label>Name:</label>
            <span>{{ user.name }}</span>
          </div>
          <div class="info-item">
            <label>Email:</label>
            <span>{{ user.email }}</span>
          </div>
          <div class="info-item">
            <label>Role:</label>
            <span>{{ user.role }}</span>
          </div>
        </div>
        <router-link to="/profile/edit" class="btn">Edit Profile</router-link>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/modules/auth'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const user = ref({})
    const authStore = useAuthStore()

    onMounted(async () => {
      try {
        await authStore.fetchUser()
        user.value = authStore.user
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    })

    return { user }
  },
}
</script>

<style scoped>
.profile-info {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
  padding: 10px;
  background: var(--light-color);
  border-radius: 4px;
}

.info-item label {
  font-weight: bold;
  margin-right: 10px;
}
</style>
