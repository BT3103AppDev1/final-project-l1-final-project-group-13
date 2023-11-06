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

const routes = [
  {
    path: "/preferences",
    name: "Preferences",
    component: PreferencesPage,
  },
  {
    path: "/userprofile",
    name: "User Profile",
    component: UserProfilePage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
  },
  {
    path: "/resetcomplete",
    name: "Password Reset Complete",
    component: ResetComplete,
  },
  {
    path: "/enternewpassword",
    name: "Enter New Password",
    component: EnterNewPassword,
  },
  {
    path: "/emailsent",
    name: "Email Sent!",
    component: EmailSent,
  },
  {
    path: "/forgotpassword",
    name: "Forgot Password",
    component: ForgotPassword,
  },
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
