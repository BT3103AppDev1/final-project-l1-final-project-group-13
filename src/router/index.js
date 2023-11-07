import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import LeaveGroup from "@/components/LeaveGroup.vue";
import StudyGroupNavBar from "@/components/StudyGroupNavBar.vue";
import TheStudyGroupPage from "@/views/TheStudyGroupPage.vue";
import TheHomePage from "@/views/TheHomePage.vue";
import StudyGroupWidget from "@/components/StudyGroupWidget.vue";
import TheNavPage from "@/views/TheNavPage.vue";
import TheCreateGroupPage from "@/views/TheCreateGroupPage.vue";
import TheVisitorStudyGroup from "@/views/TheVisitorStudyGroup.vue";
import ReviewRequest from '@/components/ReviewRequest.vue'
import RequestPage from '@/views/RequestPage.vue'
import FilesPage from '@/views/FilesPage.vue'
import FilesTable from "@/components/FilesTable.vue"
import Notification from "@/components/Notification.vue"

const routes = [
  {
    path: "/",
    name: "TheVisitorStudyGroup",
    component: TheVisitorStudyGroup, // TheNavPage// TheHomePage TheCreateGroupPage TheStudyGroupPage
  },
  {
    path: "/TheHomePage",
    name: "TheHomePage",
    component: TheHomePage,
  },
  {
    path: "/TheCreateGroupPage",
    name: "TheCreateGroupPage",
    component: TheCreateGroupPage,
  },
  {
    path: "/TheStudyGroupPage/:groupName",
    name: "/TheStudyGroupPage/:groupName",
    component: TheStudyGroupPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
