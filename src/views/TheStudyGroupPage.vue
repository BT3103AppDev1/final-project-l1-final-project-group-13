<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification />
    </div>
    <div id="studyPageEverything">
      <div id="title">
        <h1>{{ groupName }}</h1>
      </div>

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

      <div id="studygroupinfo">
        <h3 id="description" class="description">
          {{ groupDescription }}
        </h3>
        <h3 id="membercount">Members : {{ groupMember }} / {{ groupSize }}</h3>
      </div>

      <table id="table">
        <tr v-for="(row, rowIndex) in groupedMembers" :key="rowIndex">
          <td v-for="(member, memberIndex) in row" :key="member.Email">
            <div class="card">
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
                    <strong>{{ member.Name }} </strong>
                  </h4>
                  <p>{{ member.Email }}</p>
                  <p>{{ member.TelegramHandle }}</p>
                </div>
              </div>
              <p>{{ formatCourses(member.Major) }}</p>
              <p>{{ formatCourses(member.Courses) }}</p>
              <p>{{ formatCourses(member.Timing) }}</p>
              <p>{{ formatCourses(member.Location) }}</p>
              <br />
            </div>
          </td>
        </tr>
      </table>

      <br />
      <LeaveGroup :group="this.groupName" />
    </div>
  </div>
</template>

<script>
import GroupMemberWidget from "../components/GroupMemberWidget.vue";
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
    GroupMemberWidget,
    LeaveGroup,
    Sidebar,
    Notification,
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
      group: ""
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

  methods: {

    async fetchGroupData(groupName){
      try{

       console.log(groupName)
      this.group = (
          await getDoc(doc(db, "Group", groupName))
        ).data();
        console.log(this.group);
        this.groupName = this.group.Name;
        console.log(this.groupName)
        this.groupDescription = this.group.Description;
        this.groupMember = this.group.NumberOfMembers;
        this.groupSize = this.group.Size;
        this.membersEmail = this.group.Members;

        for (let i = 0; i < this.membersEmail.length; i++) {
          let a = (await getDoc(doc(db, "User", this.membersEmail[i]))).data();
          this.members.push(a);
        }
      } catch(error) {
        console.error(error)
      }
    },

    formatCourses(value) {
      return value.filter(Boolean).join(", ");
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
h1 {
  text-align: center;
}
.displayGroupMembers {
  border-radius: 10px; /* Rounded corners */
  background-color: #ffde59; /* Background color */
  padding: 20px; /* Space inside the rectangle */
  margin-bottom: 10px; /* Space below the rectangle, for when they wrap */
  box-sizing: border-box; /* Include padding and border in the width and height totals */
  flex: 0 1 auto; /* Don't grow, but allow to shrink and keep their auto base size */
  cursor: pointer;
  width: 360px; /* You can set a specific width or use a percentage */
  height: 250px; /* Height will be determined by the content size */
  /* font-family: Inter; */
}
#displayGroups {
  display: flex; /* Use flexbox to lay out children */
  flex-wrap: wrap; /* Allow children to wrap to next line */
  gap: 10px; /* Optional: adds space between children */
  justify-content: left; /* Center children horizontally in the container */
  align-items: left; /* Center children vertically in the container */
}
#studyPageEverything {
  text-align: center;
  border-radius: 10px;
  border: 1px solid #968888;
  padding: 10px;
  height: 600px;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  color: black;
}
#title {
  display: inline-block;
  text-align: center;
}
.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.button:hover {
  background-color: #d9d9d982;
}

.router-link-exact-active {
  background-color: #d9d9d982;
}
</style>
