<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification :key="refreshComp" />
    </div>
    <div class="content">
      <div id="title">
        <h1>{{ groupName }} > Requests </h1>
      </div>
      <Tabs :tabs="tabs" />
      <div class="layout">
        <div class="request">
          <ReviewRequest
            :group="this.groupName"
            :key="refreshComp"
            @reviewed="change"
          />
        </div>
      </div>
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
    Tabs,
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
    "$route.params.groupName": {
      immediate: true, // Trigger the watcher immediately when the component is created
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
  overflow-x: auto;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 1; /* Adjust the z-index as needed */
}

.content {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: 100%;
  overflow-x: auto;
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
  overflow-x: auto;
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
  flex-direction: column; /* Change to column layout */
  margin-left: 20px; /* Add margin to the left */
}

#title {
  display: inline-block;
  text-align: left; /* Change to left alignment */
  margin-bottom: 20px; /* Add margin for spacing */
  margin-left: 20px; /* Add left margin for spacing */
}
.tabs {
  margin-top: 10px; /* Add margin for spacing */
}

.request{
  width: 100%;
}
</style>
