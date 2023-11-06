import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Login from '@/components/Login.vue'
import JoinGroup from '@/components/JoinGroup.vue'
import LeaveGroup from '@/components/LeaveGroup.vue'
import StudyGroupNavBar from '@/components/StudyGroupNavBar.vue'
import TheStudyGroupPage from '@/views/TheStudyGroupPage.vue'
import TheHomePage from '@/views/TheHomePage.vue'
import StudyGroupWidget from '@/components/StudyGroupWidget.vue'
import TheNavPage from '@/views/TheNavPage.vue'
import TheCreateGroupPage from '@/views/TheCreateGroupPage.vue'


const routes = [
  {
     path: "/",
     name: "TheHomePage",
     component: TheStudyGroupPage // TheNavPage// TheHomePage TheCreateGroupPage TheStudyGroupPage

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
