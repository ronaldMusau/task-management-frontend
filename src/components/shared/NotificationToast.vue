<template>
  <div v-if="notification.show" class="notification" :class="notification.type">
    <p>{{ notification.message }}</p>
    <button @click="hideNotification" class="close-btn">&times;</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useNotification } from '@/composables/useNotification'

export default {
  setup() {
    const { notification, hideNotification } = useNotification()

    return {
      notification: computed(() => notification.value),
      hideNotification,
    }
  },
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background-color: var(--success-color);
}

.notification.error {
  background-color: var(--danger-color);
}

.notification.warning {
  background-color: var(--warning-color);
  color: var(--dark-color);
}

.notification.info {
  background-color: var(--info-color);
}

.close-btn {
  background: none;
  border: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
  margin-left: 15px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
