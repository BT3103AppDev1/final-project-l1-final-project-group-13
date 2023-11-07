import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/views/RegistrationForm.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import LeaveGroup from "@/components/LeaveGroup.vue";
import TestPage from "@/views/TestPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import CreateAccountOne from "@/views/CreateAccountOne.vue";
import CreateAccountTwo from "@/views/CreateAccountTwo.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import EmailSent from "@/views/EmailSent.vue";
import EnterNewPassword from "@/views/EnterNewPassword.vue";
import ResetComplete from "@/views/ResetComplete.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import UserProfilePage from "@/views/UserProfilePage.vue";
import PreferencesPage from "@/views/PreferencesPage.vue";
import ResetPassword from "@/components/ResetPassword.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";

const routes = [
  {
     path: "/",
     name: "Test",
     component: Login
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
