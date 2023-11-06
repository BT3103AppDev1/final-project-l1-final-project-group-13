<template>
  <div id="title">
    <h1>BT3103 Team 13</h1>
  </div>

  <div id="studygroupnavbar">
    <button id="homepagebutton" type="button" @click="gotoHomePage">
      Home Page
    </button>
    <button id="calendarbutton" type="button" @click="test">Calendar</button>
    <button id="filesbutton" type="button" @click="test">Files</button>
    <button id="requestsbutton" type="button" @click="test">Requests</button>
  </div>

  <div id="studygroupinfo">
    <h2 id="description" class="description">Descrptiusgdbofs sdfsdsdsdnsd</h2>
    <h2 id="membercount">
      Team Members : {{ memberCount }} / {{ memberLimit }}
    </h2>
  </div>

  <!-- <div id="getMembers">
    <button id="filesbutton" type="button" @click="getMemberData">
      getMembers
    </button>
  </div> -->

  <div id="displayGroupMembers">
  </div>

  <div id="joinGroup">
    <join-group />
  </div>

  <div id="deleteGroup">
    <leave-group />
  </div>
</template>

<script>
import GroupMemberWidget from "../components/GroupMemberWidget.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import StudyGroupWidget from "@/components/StudyGroupWidget.vue";
import LeaveGroup from '@/components/LeaveGroup.vue'
import TheStudyGroupPage from '@/views/TheStudyGroupPage.vue'
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

console.log("in App");
export default {
  components: { StudyGroupWidget, JoinGroup, GroupMemberWidget, LeaveGroup },
  name: "TheStudyGroupPage",
  data() {
    return {
      groupName : 'BT1101',
      groupDescription : '',
      memberCount: 3,
      memberLimit: 6,
      members : [],
    };
  },
  async mounted() {
    let userEmails = [];
        let groupName = this.groupName;
        const groups = await getDocs(collection(db, "Group"));
        let displayGroupMembers = document.getElementById("displayGroupMembers");
        console.log("test run");
        groups.forEach((group) => {
          let groupData = group.data();
          let members = groupData.Members;
          let group_name = groupData.Name;
          this.groupDescription = groupData.Description;
          this.memberCount = groupData.NumberOfMembers;
          this.memberLimit = groupData.Size;
          if (group_name == groupName) {
            members.forEach((member) => {
              this.members.push(member);
              console.log(member);
            });
          }
        });

        const memberDetails = await getDocs(collection(db, "User"));
        memberDetails.forEach((user) => {
          let groupData = user.data();
          let user_name = groupData.Name;
          let user_email = groupData.Email;
          let user_telegramHandle = groupData.TelegramHandle;
          let user_major = groupData.Major;
          let user_courses = groupData.Courses;
          let user_timing = groupData.Timing;
          let user_location = groupData.Location;

          if (this.members.includes(user_email)) {
            console.log(
              "Displaying: ",
              user_name,
              user_email,
              user_telegramHandle,
              user_major
            );
            let newDiv = document.createElement("div");
            newDiv.id = user_email;
            newDiv.innerHTML = 
            `<button><h3 class='contacts'>${user_name}<br>${user_email}<br>${user_telegramHandle}</h3><h4>${user_major}<br>${user_courses}<br>${user_timing}<br>${user_location}</h4></button>`;
            newDiv.className = "groupDisplay";
            displayGroupMembers.appendChild(newDiv);
          }
        });
  },
  methods: {
    test() {
      console.log("Hello");
    },
    async getMemberData() {
      console.log("IN AC");

      try {
        let userEmails = [];
        let groupName = this.groupName;
        const groups = await getDocs(collection(db, "Group"));
        let displayGroupMembers = document.getElementById("displayGroupMembers");
        console.log("test run");
        groups.forEach((group) => {
          let groupData = group.data();
          let members = groupData.Members;
          let group_name = groupData.Name;
          this.groupDescription = groupData.Description;
          this.memberCount = groupData.NumberOfMembers;
          this.memberLimit = groupData.Size;
          if (group_name == groupName) {
            members.forEach((member) => {
              this.members.push(member);
              console.log(member);
            });
          }
        });

        const memberDetails = await getDocs(collection(db, "User"));
        memberDetails.forEach((user) => {
          let groupData = user.data();
          let user_name = groupData.Name;
          let user_email = groupData.Email;
          let user_telegramHandle = groupData.TelegramHandle;
          let user_major = groupData.Major;
          let user_courses = groupData.Courses;
          let user_timing = groupData.Timing;
          let user_location = groupData.Location;

          if (this.members.includes(user_email)) {
            console.log(
              "Displaying: ",
              user_name,
              user_email,
              user_telegramHandle,
              user_major
            );
            let newDiv = document.createElement("div");
            newDiv.id = user_email;
            newDiv.innerHTML = 
            `<button><h3 class='contacts'>${user_name}<br>${user_email}<br>${user_telegramHandle}</h3><h4>${user_major}<br>${user_courses}<br>${user_timing}<br>${user_location}</h4></button>`;
            newDiv.className = "groupDisplay";
            displayGroupMembers.appendChild(newDiv);
          }
        });

      } catch (error) {
        console.error("Error joining group: ", error);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #0f56c7;
}
</style>
