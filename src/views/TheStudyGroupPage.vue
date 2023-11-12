<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification />
    </div>
    <div class="content">
      <div id="title">
        <h1>{{ groupName }}</h1>
      </div>

      <Tabs :tabs="tabs" />

      <div class="layout">
        <div id="description">
          <h3>
            {{ groupDescription }}
          </h3>
          <br />
          <h3>Members : {{ groupMember }} / {{ groupSize }}</h3>
        </div>

        <table id="table">
          <tr v-for="(row, rowIndex) in groupedMembers" :key="rowIndex">
            <td v-for="(member, memberIndex) in row" :key="member.Email">
              <div class="card">
                <div class="card-content">
                  <div class="profile">
                    <div class="picture">
                      <br />
                      <img
                        class="img"
                        src="@/assets/profileIcon.png"
                        alt="Profile picture"
                      />
                    </div>
                    <div class="account">
                      <h4>
                        <strong
                          :style="{
                            whiteSpace: isLongText(member.Name)
                              ? 'nowrap'
                              : 'normal',
                          }"
                        >
                          {{ member.Name }}
                        </strong>
                      </h4>
                      <p
                        :style="{
                          whiteSpace: isLongText(member.Email)
                            ? 'nowrap'
                            : 'normal',
                        }"
                      >
                        {{ member.Email }}
                      </p>
                      <p
                        :style="{
                          whiteSpace: isLongText(member.TelegramHandle)
                            ? 'nowrap'
                            : 'normal',
                        }"
                      >
                        {{ member.TelegramHandle }}
                      </p>
                    </div>
                  </div>
                  <p>{{ formatCourses(member.Major) }}</p>
                  <p>{{ formatCourses(member.Courses) }}</p>
                  <p>{{ formatCourses(member.Timing) }}</p>
                  <p>{{ formatCourses(member.Location) }}</p>
                  <br />
                </div>
              </div>
            </td>
          </tr>
        </table>

        <br />
        <LeaveGroup :group="this.groupName" />
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import StudyGroupWidget from "@/components/StudyGroupWidget.vue";
import LeaveGroup from "@/components/LeaveGroup.vue";
import TheStudyGroupPage from "@/views/TheStudyGroupPage.vue";
import { firebaseApp } from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  getDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TheVisitorStudyGroup from "./TheVisitorStudyGroup.vue";
import Sidebar from "@/components/Sidebar.vue";
import Notification from "@/components/Notification.vue";
const db = getFirestore(firebaseApp);

console.log("in App");
export default {
  components: {
    StudyGroupWidget,
    JoinGroup,
    LeaveGroup,
    Sidebar,
    Notification,
    Tabs,
  },
  name: "TheStudyGroupPage",
  data() {
    return {
      user: false,
      email: "",
      groupName: "",
      groupDescription: "",
      groupMember: 0,
      groupSize: 0,
      members: [],
      membersEmail: [],
      group: "",
      tabs: [],
    };
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      }
    });
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

  methods: {
    async fetchGroupData(groupName) {
      try {
        console.log(groupName);
        this.group = (await getDoc(doc(db, "Group", groupName))).data();
        console.log(this.group);
        this.groupName = this.group.Name;
        console.log(this.groupName);
        this.groupDescription = this.group.Description;
        this.groupMember = this.group.NumberOfMembers;
        this.groupSize = this.group.Size;
        this.membersEmail = this.group.Members;
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

        for (let i = 0; i < this.membersEmail.length; i++) {
          let a = (await getDoc(doc(db, "User", this.membersEmail[i]))).data();
          this.members.push(a);
        }
      } catch (error) {
        console.error(error);
      }
    },

    formatCourses(value) {
      return value.filter(Boolean).join(", ");
    },
    isLongText(text) {
      // You can define your own criteria for determining a long text
      // For example, consider texts longer than a certain length as long
      const maxLengthForLongText = 15; // Adjust this value based on your design
      return text && text.length > maxLengthForLongText;
    },
  },

  computed: {
    groupedMembers() {
      const result = [];
      const chunkSize = 3;
      for (let i = 0; i < this.members.length; i += chunkSize) {
        result.push(this.members.slice(i, i + chunkSize));
      }
      return result;
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

#description {
  display: inline-block;
  text-align: left; /* Change to left alignment */
  margin-bottom: 20px; /* Add margin for spacing */
  margin-left: 20px;
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

#title {
  display: inline-block;
  text-align: left; /* Change to left alignment */
  margin-bottom: 20px; /* Add margin for spacing */
  margin-left: 20px; /* Add left margin for spacing */
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
} /* Add some padding */

.notification-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.tabs {
  margin-top: 10px;
}



#table {
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-left: auto;
  margin-right: auto;
  overflow-x: auto;
}



.card{
  border: 1px solid #ffde59;
  border-radius: 20px;
  padding: 3px 10px 3px 10px;
  width: 360px;
  height: 340px;
  text-align: left;
  background-color: #ffde59;
  margin-left: auto;
  margin-right: auto;
  margin: 15px;
}

.card-content {
  width: auto; /* Let the content determine the width */
  min-width: 320px; /* Minimum width for the card */
  text-align: left;
  
}

.account {
  flex-grow: 1;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; /* Display ellipsis (...) for overflowed text */
  max-width: 200px; /* Adjust the value based on your design */
}
.account-content {
  max-width: 150px; /* Adjust the value based on your design */
}
.leave-group {
  margin-top: 20px;
}



td,
tr {
  text-align: center;
}

.table-cell {
  vertical-align: middle;
}

.img {
  height: 80px;
  width: 80px;
}

.profile {
  display: flex;
  align-items: center;
}

.picture {
  margin-right: 20px;
}

/* Add any additional styles as needed */
</style>
