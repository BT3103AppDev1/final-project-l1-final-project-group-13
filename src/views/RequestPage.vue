<template>
  <div class="sidebar">
    <Sidebar />
  </div>
  <Notification :key="refreshComp" />
  <div class="request">
    <h1>{{ groupName }}</h1>
    <Tabs :tabs="tabs" />
    <ReviewRequest
      :group="this.groupName"
      :key="refreshComp"
      @reviewed="change"
    />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../firebase.js";
import {
  getDoc,
  getFirestore,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
} from "firebase/firestore";
import ReviewRequest from "@/components/ReviewRequest.vue";
import Sidebar from "@/components/Sidebar.vue";
import Notification from "@/components/Notification.vue";
import Tabs from "@/components/Tabs.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "RequestPage",
  components: {
    ReviewRequest,
    Sidebar,
    Notification,
    Tabs
  },
  data() {
    return {
      user: false,
      groupName: "",
      refreshComp: 0,
      group: "",
      email: "",
      tabs: [],
    };
  },
  watch: {
    '$route.params.groupName': {
      immediate: true, // Trigger the watcher immediately when the component is created
      handler(newValue, oldValue) {
        if (newValue) {
          this.fetchGroupData(newValue);
          console.log(newValue)
        }
      },
    },
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      }
    });
  },
  methods: {
    async fetchGroupData(groupName){
      try{
       console.log(groupName)
      this.group = (
          await getDoc(doc(db, "Group", groupName))
        ).data();
        console.log(this.group);
        this.groupName = this.group.Name;
        this.tabs = [
        {
          to: { name: 'StudyGroupPage', params: { groupName: groupName } },
          text: 'Main',
        },
        {
          to: { name: 'FilesPage', params: { groupName: groupName } },
          text: 'Files',
        },
        {
          to: { name: 'RequestPage', params: { groupName: groupName } },
          text: 'Requests',
        },
      ]

      } catch(error) {
        console.error(error)
      }
    },

    change() {
      this.refreshComp += 1;
    },
  },
};
</script>

<style scoped>
.request {
  font-family: "AbeeZee";
  color: black;
  background-color: #f5f5f5;
  margin-left: auto;
  margin-right: auto;
}

.sidebar {
  float: left;
  height: 100%;
}
</style>
