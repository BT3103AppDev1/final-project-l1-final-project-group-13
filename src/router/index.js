import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/views/RegistrationForm.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import LeaveGroup from "@/components/LeaveGroup.vue";
import TestPage from "@/views/TestPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import Sidebar from "@/components/Sidebar.vue";
import CreateAccountOne from "@/views/CreateAccountOne.vue";
import CreateAccountTwo from "@/views/CreateAccountTwo.vue";

const routes = [
  {
    path: "/createaccount2",
    name: "Create an Account (2)",
    component: CreateAccountTwo,
  },
  {
    path: "/createaccount1",
    name: "Create an Account (1)",
    component: CreateAccountOne,
  },
  {
    path: "/login",
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
