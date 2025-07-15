<template>
  <div>
    <AppNavbar />
    <div class="hero">
      <div class="container">
        <h1>Task Management System</h1>
        <p>Efficiently manage your tasks and boost productivity</p>
        <div class="cta-buttons">
          <router-link to="/login" class="btn">User Login</router-link>
          <router-link to="/admin/login" class="btn-secondary">Admin Login</router-link>
        </div>
      </div>
    </div>
    <div class="features">
      <div class="container">
        <h2>Key Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Task Management</h3>
            <p>Create, assign, and track tasks with ease.</p>
          </div>
          <div class="feature-card">
            <h3>User Management</h3>
            <p>Admin can manage all users in the system.</p>
          </div>
          <div class="feature-card">
            <h3>Real-time Updates</h3>
            <p>Get notified about task status changes.</p>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
}
</script>

<style scoped>
.hero {
  background-color: var(--dark-color);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.features {
  padding: 60px 0;
  background-color: var(--light-color);
}

.features h2 {
  text-align: center;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
}
</style>
