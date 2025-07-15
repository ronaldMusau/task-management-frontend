<template>
  <NotificationToast />
  <router-view />
</template>

<script>
import NotificationToast from './components/shared/NotificationToast.vue'

export default {
  components: { NotificationToast },
}
</script>

<style>
/* Global styles can go here if needed */
</style>
