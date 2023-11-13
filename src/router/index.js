import { createRouter, createWebHistory } from "vue-router";
import RegistrationForm from "@/views/RegistrationForm.vue";
import TheStudyGroupPage from "@/views/TheStudyGroupPage.vue";
import TheHomePage from "@/views/TheHomePage.vue";
import TheCreateGroupPage from "@/views/TheCreateGroupPage.vue";
import TheVisitorStudyGroup from "@/views/TheVisitorStudyGroup.vue";
import RequestPage from "@/views/RequestPage.vue";
import FilesPage from "@/views/FilesPage.vue";
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
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import BrowseGroupsPage from '@/views/BrowseGroupsPage.vue'
import NotFound from "@/components/NotFound.vue"
import FAQPage from '@/views/FAQPage.vue';

const routes = [
  {
    path: "/",
    name: "Log In",
    component: LoginPage,
  },
  
  {
    path: "/resetpassword",
    name: "Reset Password",
    component: ResetPasswordPage,
  },
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
    path: "/signup",
    name: "Sign Up",
    component: RegistrationForm,
  },

  {
    path: "/browsegroups",
    name: "Browse Groups",
    component: BrowseGroupsPage,
  },
  {
    path: "/home",
    name: "TheHomePage",
    component: TheHomePage,
  },
  {
    path: "/CreateGroupPage",
    name: "CreateGroupPage",
    component: TheCreateGroupPage,
  },
  {
    path: "/StudyGroupPage/:groupName",
    name: "StudyGroupPage",
    component: TheStudyGroupPage,
  },
  {
    path: "/VisitorStudyGroupPage/:groupName",
    name: "VisitorStudyGroupPage",
    component: TheVisitorStudyGroup,
  },
  { 
    path: "/StudyGroupPage/:groupName/files",
    name: "FilesPage",
    component: FilesPage
  },
  { 
    path: "/StudyGroupPage/:groupName/request",
    name: "RequestPage",
    component: RequestPage
  },
  
  {
    path: "/faq",
    name: "FAQPage",
    component: FAQPage,
  },
{
  path: "/:catchAll(.*)",
  name: "Not found page",
  component: NotFound
}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
