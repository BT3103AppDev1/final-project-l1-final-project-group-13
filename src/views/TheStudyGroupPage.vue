<template>
  <div id="studyPageEverything">
    <div id="title">
      <h1>{{ groupName }}</h1>
    </div>

    <div id="studygroupnavbar">
      <router-link to="/TheHomePage"
        ><button id="homepagebutton">HomePage</button></router-link
      >
      <router-link to="/TheHomePage"
        ><button id="calendarbutton">Calendar</button></router-link
      >
      <router-link to="/TheHomePage"
        ><button id="filesbutton">Files</button></router-link
      >
      <router-link to="/TheHomePage"
        ><button id="requestsbutton">Requests</button></router-link
      >
    </div>

    <div id="studygroupinfo">
      <h2 id="description" class="description">
        Descrptiusgdbofs sdfsdsdsdnsd
      </h2>
      <h2 id="membercount">
        Team Members : {{ memberCount }} / {{ memberLimit }}
      </h2>
    </div>

    <div id="displayGroups">
      <div
        class="displayGroupMembers"
        v-for="groupMember in memberDetails"
        :key="groupMember.email"
      >
        <div class="groups">
          {{ groupMember.name }} <br />
          {{ groupMember.email }} <br />
          {{ groupMember.telegramHandle }} <br />
          {{ groupMember.major }} <br />
          <br />
          {{ groupMember.courses }} <br />
          {{ groupMember.timing }} <br />
          {{ groupMember.location }}
        </div>
      </div>
    </div>

    <div id="gotoHomePage">
      <router-link to="/TheHomePage"><button>HomePage</button></router-link>
    </div>

    <div id="leaveGroupButton">
      <button @click="leaveGroup">Leave Group</button>
    </div>

    <!-- <div id="joinGroup">
    <join-group />
  </div>

  <div id="deleteGroup">
    <leave-group />
  </div> -->
  </div>
</template>

<script>
import GroupMemberWidget from "../components/GroupMemberWidget.vue";
import JoinGroup from "@/components/JoinGroup.vue";
import StudyGroupWidget from "@/components/StudyGroupWidget.vue";
import LeaveGroup from "@/components/LeaveGroup.vue";
import TheStudyGroupPage from "@/views/TheStudyGroupPage.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

console.log("in App");
export default {
  components: { StudyGroupWidget, JoinGroup, GroupMemberWidget, LeaveGroup },
  name: "TheStudyGroupPage",
  data() {
    return {
      groupName: "BT1101",
      groupDescription: "",
      memberCount: 3,
      memberLimit: 6,
      members: [],
      memberDetails: [],
    };
  },
  created() {
    this.groupName = this.$route.params.groupName;
    console.log(this.groupName);
  },
  async mounted() {
    await this.getMemberData();
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
        let displayGroupMembers = document.getElementById(
          "displayGroupMembers"
        );
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
            this.memberDetails.push({
              name: user_name,
              email: user_email,
              telegramHandle: user_telegramHandle,
              major: user_major,
              courses: user_courses,
              timing: user_timing,
              location: user_location,
            });
            // let newDiv = document.createElement("div");
            // newDiv.id = user_email;
            // newDiv.innerHTML =
            // `<button><h3 class='contacts'>${user_name}<br>${user_email}<br>${user_telegramHandle}</h3><h4>${user_major}<br>${user_courses}<br>${user_timing}<br>${user_location}</h4></button>`;
            // newDiv.className = "groupDisplay";
            // displayGroupMembers.appendChild(newDiv);
          }
        });
      } catch (error) {
        console.error("Error joining group: ", error);
      }
    },
    async leaveGroup() {
      console.log("IN AC");

      try {
        const docRef = await updateDoc(doc(db, "Group", "BT3103"), {
          Members: arrayRemove("e0735448@u.nus.edu"),
        });
        console.log(docRef);
        alert("Leaved group successfully!");
      } catch (error) {
        console.error("Error leaving group: ", error);
      }
    },
  },
};
</script>

<style>
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
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #968888;
  padding: 10px;
  margin: 20px;
  height: 600px;
  width: 1500px;
}
#title {
  display: inline-block;
  text-align: center;
}
</style>
