<template>
  <div class="user-layout">
    <Navbar />
    <div class="user-content">
      <aside class="user-sidebar">
        <router-link :to="{ name: 'user-dashboard' }" class="sidebar-link" active-class="active">
          Dashboard
        </router-link>
        <router-link :to="{ name: 'my-tasks' }" class="sidebar-link" active-class="active">
          My Tasks
        </router-link>
        <router-link :to="{ name: 'user-profile' }" class="sidebar-link" active-class="active">
          Profile
        </router-link>
      </aside>
      <main class="user-main">
        <router-view />
      </main>
    </div>
    <Footer />
    <NotificationToast />
  </div>
</template>

<script setup>
import Navbar from '@/components/shared/AppNavbar.vue'
import Footer from '@/components/shared/AppFooter.vue'
import NotificationToast from '@/components/shared/NotificationToast.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/modules/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<style scoped>
.user-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.user-content {
  display: flex;
  flex: 1;
}

.user-sidebar {
  width: 200px;
  background-color: #34495e;
  padding: 20px;
  min-height: calc(100vh - 120px);
}

.sidebar-link {
  display: block;
  color: #ecf0f1;
  padding: 10px;
  margin-bottom: 5px;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar-link:hover {
  background-color: #2c3e50;
}

.sidebar-link.active {
  background-color: #3498db;
  font-weight: bold;
}

.user-main {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
