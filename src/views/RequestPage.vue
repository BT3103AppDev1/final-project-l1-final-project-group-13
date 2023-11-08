<template>
  <div class = "sidebar">
  <Sidebar/>
  </div>
  <Notification :key="refreshComp" />
    <div class ="request">
  <h1>{{ groupName }}</h1>
  <div v-if="groupName" class="nav" >
      <router-link class="button" :to="{name: 'StudyGroupPage', params: { groupName: groupName }}">
        <span class="text">Main</span>
      </router-link>
      <router-link class="button" :to="{ name: 'FilesPage', params: { groupName: groupName }}">
        <span class="text">Files</span>
      </router-link>
      <router-link class="button" :to="{name: 'RequestPage', params: { groupName: groupName}}">
        <span class="text">Requests</span>
      </router-link>
    </div>
  <ReviewRequest :group=this.groupName :key = "refreshComp" @reviewed = "change"/>
</div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {firebaseApp} from "../firebase.js";
import {
  getDoc,
  getFirestore,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
} from "firebase/firestore";
import ReviewRequest from "@/components/ReviewRequest.vue";
import Sidebar from "@/components/Sidebar.vue"
import Notification from "@/components/Notification.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "RequestPage",
  components: {
    ReviewRequest,
    Sidebar,
    Notification
  },
  data() {
    return {
      user: false,
      groupName: "",
      refreshComp: 0,
      group: "",
      email: "",
    };
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.group = (await getDoc(doc(db, "Group", this.$route.params.groupName))).data()
        this.groupName = this.group.Name
      }
    });
  },
  methods: {
    change() {
      this.refreshComp += 1
    }
  }
};
</script>

<style>
.request{
    font-family: 'AbeeZee';
    color:black;
    background-color: #F5F5F5;
    margin-left: auto;
    margin-right: auto;
}

.sidebar{
  float: left;
  height: 100%;
}
</style>
