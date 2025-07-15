import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import NotFound from '@/views/NotFound.vue'

// Auth components
import LoginPage from '@/components/auth/LoginPage.vue'
import RegisterPage from '@/components/auth/RegisterPage.vue'
import AdminLogin from '@/components/auth/AdminLogin.vue'

// User components
import UserDashboard from '@/components/user/UserDashboard.vue'
import MyTasks from '@/components/user/MyTasks.vue'
import TaskStatus from '@/components/user/TaskStatus.vue'
import UserProfile from '@/components/user/UserProfile.vue'
import UserProfileEdit from '@/components/user/UserProfileEdit.vue'

// Admin components
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import UsersList from '@/components/admin/UsersList.vue'
import UserCreateEdit from '@/components/admin/UserCreateEdit.vue'
import TaskManagement from '@/components/admin/TaskManagement.vue'
import BulkAssign from '@/components/admin/BulkAssign.vue'
import AdminProfile from '@/components/admin/AdminProfile.vue'
import TaskForm from '@/components/admin/TaskForm.vue'
import TaskDetail from '@/components/shared/TaskDetail.vue'

import { useAuthStore } from '@/stores/modules/auth'
import { useAdminAuthStore } from '@/stores/modules/adminAuth'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { requiresGuest: true },
  },
  // User routes
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/tasks',
    name: 'MyTasks',
    component: MyTasks,
    meta: { requiresAuth: true },
  },
  {
    path: '/tasks/:id/status',
    name: 'TaskStatus',
    component: TaskStatus,
    meta: { requiresAuth: true },
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: TaskDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/edit',
    name: 'UserProfileEdit',
    component: UserProfileEdit,
    meta: { requiresAuth: true },
  },
  // Admin routes
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/users',
    name: 'UsersList',
    component: UsersList,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/users/create',
    name: 'UserCreate',
    component: UserCreateEdit,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: UserCreateEdit,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/tasks',
    name: 'TaskManagement',
    component: TaskManagement,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/tasks/create',
    name: 'TaskCreate',
    component: TaskForm,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/tasks/edit/:id',
    name: 'TaskEdit',
    component: TaskForm,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/tasks/bulk-assign',
    name: 'BulkAssign',
    component: BulkAssign,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/profile',
    name: 'AdminProfile',
    component: AdminProfile,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/profile/edit',
    name: 'AdminProfileEdit',
    component: () => import('@/components/admin/AdminProfileEdit.vue'),
    meta: { requiresAdmin: true },
  },
  // 404 catch-all
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const adminAuthStore = useAdminAuthStore()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // Check if route requires admin
  if (to.meta.requiresAdmin && !adminAuthStore.isAuthenticated) {
    next('/admin/login')
    return
  }

  // Check if route requires guest (not logged in)
  if (to.meta.requiresGuest && (authStore.isAuthenticated || adminAuthStore.isAuthenticated)) {
    next(authStore.isAuthenticated ? '/dashboard' : '/admin/dashboard')
    return
  }

  next()
})

export default router
