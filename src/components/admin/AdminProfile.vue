<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>Admin Profile</h2>
        <div class="profile-info">
          <div class="info-item">
            <label>Name:</label>
            <span>{{ admin.name }}</span>
          </div>
          <div class="info-item">
            <label>Email:</label>
            <span>{{ admin.email }}</span>
          </div>
          <div class="info-item">
            <label>Role:</label>
            <span>Admin</span>
          </div>
        </div>
        <router-link to="/admin/profile/edit" class="btn">Edit Profile</router-link>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAdminAuthStore } from '@/stores/modules/adminAuth'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const admin = ref({})
    const adminAuthStore = useAdminAuthStore()

    onMounted(async () => {
      try {
        await adminAuthStore.fetchAdmin()
        admin.value = adminAuthStore.admin
      } catch (error) {
        console.error('Error fetching admin profile:', error)
      }
    })

    return { admin }
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
