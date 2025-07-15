<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Task Management System. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const currentYear = ref(new Date().getFullYear())
    return { currentYear }
  },
}
</script>

<style scoped>
.footer {
  background-color: var(--dark-color);
  color: white;
  padding: 20px 0;
  margin-top: 40px;
}

.footer-content {
  text-align: center;
}
</style>
