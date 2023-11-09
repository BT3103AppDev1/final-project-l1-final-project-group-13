<template>
  <div class="sidebar">
    <Sidebar />
  </div>
  <Notification :key="refreshComp" />
  <div class="files">
    <h1>{{ groupName }}</h1>
    <div v-if="groupName" class="nav">
      <router-link
        class="button"
        :to="{ name: 'StudyGroupPage', params: { groupName: groupName } }"
      >
        <span class="text">Main</span>
      </router-link>
      <router-link
        class="button"
        :to="{ name: 'FilesPage', params: { groupName: groupName } }"
      >
        <span class="text">Files</span>
      </router-link>
      <router-link
        class="button"
        :to="{ name: 'RequestPage', params: { groupName: groupName } }"
      >
        <span class="text">Requests</span>
      </router-link>
    </div>
    <AddFiles :group="this.groupName" @uploaded="change" />
    <br />
    <div id="filesTable">
      <FilesTable
        :group="this.groupName"
        @deleted="change"
        :key="refreshComp"
      />
    </div>
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
import FilesTable from "@/components/FilesTable.vue";
import Sidebar from "@/components/Sidebar.vue";
import AddFiles from "@/components/AddFiles.vue";
import Notification from "@/components/Notification.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "FilesPage",
  components: {
    FilesTable,
    Sidebar,
    AddFiles,
    Notification,
  },
  data() {
    return {
      user: false,
      email: "",
      group: "",
      refreshComp: 0,
      groupName: "",
    };
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.group = (
          await getDoc(doc(db, "Group", this.$route.params.groupName))
        ).data();
        this.groupName = this.group.Name;
      }
    });
  },

  methods: {
    change() {
      this.refreshComp += 1;
      console.log(1);
    },
  },
};
</script>

<style scoped>
.filesTable {
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
