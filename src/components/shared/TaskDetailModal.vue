<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="onClose">&times;</span>
      <h2>Task Details</h2>
      <div class="task-details">
        <div class="detail-item">
          <label>Title:</label>
          <span>{{ task.title }}</span>
        </div>
        <div class="detail-item">
          <label>Description:</label>
          <span>{{ task.description }}</span>
        </div>
        <div class="detail-item">
          <label>Status:</label>
          <span :class="statusClass(task.status)">{{ task.status }}</span>
        </div>
        <div class="detail-item">
          <label>Deadline:</label>
          <span>{{ formatDate(task.deadline) }}</span>
        </div>
        <div class="detail-item">
          <label>Assigned To:</label>
          <span>{{ task.assignee.name }}</span>
        </div>
        <div class="detail-item">
          <label>Created By:</label>
          <span>{{ task.creator.name }}</span>
        </div>
      </div>
      <div class="actions" v-if="isAdmin || isAssignee">
        <button v-if="isAssignee" @click="onStatusUpdate" class="btn">Update Status</button>
        <button v-if="isAdmin" @click="onEdit" class="btn-secondary">Edit Task</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/modules/auth'
import { useAdminAuthStore } from '@/stores/modules/adminAuth'

export default {
  props: {
    show: Boolean,
    task: Object,
    onClose: Function,
    onStatusUpdate: Function,
    onEdit: Function,
  },
  setup(props) {
    const authStore = useAuthStore()
    const adminAuthStore = useAdminAuthStore()

    const isAdmin = computed(() => adminAuthStore.isAuthenticated)
    const isAssignee = computed(() => {
      if (!authStore.isAuthenticated) return false
      return props.task.assigned_to === authStore.user.id
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    const statusClass = (status) => {
      return {
        'status-pending': status === 'pending',
        'status-in-progress': status === 'in_progress',
        'status-completed': status === 'completed',
      }
    }

    return { isAdmin, isAssignee, formatDate, statusClass }
  },
}
</script>

<style scoped>
.task-details {
  margin: 20px 0;
}

.detail-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.detail-item label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-secondary {
  background: var(--secondary-color);
}

.status-pending {
  color: var(--warning-color);
  font-weight: bold;
}

.status-in-progress {
  color: var(--info-color);
  font-weight: bold;
}

.status-completed {
  color: var(--success-color);
  font-weight: bold;
}
</style>
