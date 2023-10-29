import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import Login from '@/components/Login.vue'
import JoinGroup from '@/components/JoinGroup.vue'
import LeaveGroup from '@/components/LeaveGroup.vue'
import ReviewRequest from '@/components/ReviewRequest.vue'
import RequestPage from '@/views/RequestPage.vue'

const routes = [
  {
    path: "/",
    name: "Review Request",
    component: JoinGroup
 },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
