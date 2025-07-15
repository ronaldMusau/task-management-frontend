<template>
  <div>
    <AppNavbar />
    <div class="container">
      <div class="card">
        <h2>{{ isEdit ? 'Edit User' : 'Create User' }}</h2>
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
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="form.password"
              :required="!isEdit"
            />
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              class="form-control"
              v-model="form.password_confirmation"
              :required="!isEdit"
            />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select class="form-control" v-model="form.role" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" class="btn">{{ isEdit ? 'Update' : 'Create' }}</button>
          <router-link to="/admin/users" class="btn-secondary">Cancel</router-link>
          <div v-if="error" class="alert alert-danger mt-20">{{ error }}</div>
          <div v-if="success" class="alert alert-success mt-20">{{ success }}</div>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/users'
import { useNotification } from '@/composables/useNotification'
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'

export default {
  components: { AppNavbar, AppFooter },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const { showNotification } = useNotification()

    const form = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'user',
    })
    const error = ref('')
    const success = ref('')
    const isEdit = computed(() => route.params.id !== undefined)

    const fetchUser = async (id) => {
      try {
        const user = await userStore.getUserById(id)
        form.value = {
          name: user.name,
          email: user.email,
          password: '',
          password_confirmation: '',
          role: user.role,
        }
      } catch {
        showNotification('Failed to fetch user', 'error')
        router.push('/admin/users')
      }
    }

    onMounted(() => {
      if (isEdit.value) {
        fetchUser(route.params.id)
      }
    })

    const handleSubmit = async () => {
      if (form.value.password !== form.value.password_confirmation) {
        error.value = 'Passwords do not match'
        return
      }

      try {
        if (isEdit.value) {
          await userStore.updateUser(route.params.id, form.value)
          success.value = 'User updated successfully'
        } else {
          await userStore.createUser(form.value)
          success.value = 'User created successfully'
        }
        showNotification(success.value, 'success')
        setTimeout(() => {
          router.push('/admin/users')
        }, 1500)
      } catch (err) {
        error.value = err.response?.data?.message || 'Operation failed'
        showNotification(error.value, 'error')
      }
    }

    return { form, error, success, isEdit, handleSubmit }
  },
}
</script>

<style scoped>
.btn-secondary {
  margin-left: 10px;
  background: var(--secondary-color);
}
</style>
