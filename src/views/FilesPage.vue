<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification  :key="refreshComp"/>
    </div>
    <div class="content">
      <div id="title">
        <h1>{{ groupName }} > Files </h1>
      </div>
      <Tabs :tabs="tabs" />
      <div class="layout">
        <div id="addFiles">
          <AddFiles :group="this.groupName" @uploaded="change" />
          <br />
        </div>
        <div id="filesTable">
          <FilesTable
            :group="this.groupName"
            @deleted="change"
            :key="refreshComp"
          />
        </div>
      </div>
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
    Tabs,
  },
  data() {
    return {
      user: false,
      email: "",
      group: "",
      refreshComp: 0,
      groupName: "",
      tabs: [],
    };
  },
  watch: {
    "$route.params.groupName": {
      immediate: true, 
      handler(newValue, oldValue) {
        if (newValue) {
          this.fetchGroupData(newValue);
          console.log(newValue);
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
    async fetchGroupData(groupName) {
      try {
        console.log(groupName);
        this.group = (await getDoc(doc(db, "Group", groupName))).data();
        console.log(this.group);
        this.groupName = this.group.Name;
        this.tabs = [
          {
            to: { name: "StudyGroupPage", params: { groupName: groupName } },
            text: "Main",
          },
          {
            to: { name: "FilesPage", params: { groupName: groupName } },
            text: "Files",
          },
          {
            to: { name: "RequestPage", params: { groupName: groupName } },
            text: "Requests",
          },
        ];
      } catch (error) {
        console.error(error);
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
h1, h2, h3, h4, h5, h6, p {
  color: #000;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
}
.container {
  display: flex;
  position: relative;
  background-color: #f5f5f5;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 1;
}

.content {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: 100%;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-top: 0px;
  margin-left: 20px;
  margin-right: 20px;
}
.notification-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.PageBody {
  display: flex;
  width: 80%;
  flex: 1;
  flex-direction: column; 
  margin-left: 20px; 
}

#title {
  display: inline-block;
  text-align: left; 
  margin-bottom: 20px; 
  margin-left: 20px; 
}
.tabs {
  margin-top: 10px; 
}

#filesTable {
  width: 100%; 
}

#addFiles {
  align-self: flex-end;
  margin-top: 10px; 
  margin-bottom: 10px;
  margin-right: 20px; 
}
</style>
