<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <router-link to="/" class="btn">Go to Home</router-link>
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
.not-found {
  text-align: center;
  padding: 100px 0;
}

.not-found h1 {
  font-size: 48px;
  margin-bottom: 20px;
  color: var(--danger-color);
}

.not-found p {
  font-size: 20px;
  margin-bottom: 30px;
}
</style>
