import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import Login from "@/components/Login.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import LeaveGroup from "@/components/LeaveGroup.vue";
import TestPage from "@/views/TestPage.vue";
import Sidebar from "@/components/Sidebar.vue";

const routes = [
  {
    path: "/",
    name: "TestPage",
    component: TestPage,
  },
  {
    path: "/",
    name: "Leave Group",
    component: LeaveGroup,
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
