import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Login from '@/components/Login.vue'
import JoinGroup from '@/components/JoinGroup.vue'
import LeaveGroup from '@/components/LeaveGroup.vue'
import SearchBar from '@/components/SearchBar.vue'
import testing from '@/components/testing.vue'

const routes = [
  // {
  //    path: "/",
  //    name: "SearchBar",
  //    component: SearchBar
  // },
  {
    path: "/",
    name: "testing",
    component: testing
 },
  {
    path: '/about',
    name: 'About',
    component: About
    }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
