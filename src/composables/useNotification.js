import { ref } from 'vue'

export const useNotification = () => {
  const notification = ref({
    show: false,
    message: '',
    type: 'success',
  })

  const showNotification = (message, type = 'success') => {
    notification.value = {
      show: true,
      message,
      type,
    }

    setTimeout(() => {
      hideNotification()
    }, 3000)
  }

  const hideNotification = () => {
    notification.value.show = false
  }

  return { notification, showNotification, hideNotification }
}
