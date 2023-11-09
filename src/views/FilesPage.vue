<template>
  <div class="sidebar">
    <Sidebar />
  </div>
  <Notification :key="refreshComp" />
  <div class="files">
    <h1>{{ groupName }}</h1>
    <Tabs :tabs="tabs" />
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
import Tabs from "@/components/Tabs.vue";
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
    Tabs
  },
  data() {
    return {
      user: false,
      email: "",
      group: "",
      refreshComp: 0,
      groupName: "",
      tabs: []
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
