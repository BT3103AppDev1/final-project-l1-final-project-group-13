import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import LeaveGroup from "@/components/LeaveGroup.vue";
import TestPage from "@/views/TestPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import Sidebar from "@/components/Sidebar.vue";

const routes = [
  {
    path: "/",
    name: "Log In",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: RegistrationForm,
  },
  {
    path: "/home",
    name: "Home",
    component: TestPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
