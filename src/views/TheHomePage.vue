<template>
  <h1>Test</h1>
  <div id="title">
    <h1>Welcome : {{ name }} email : {{ email }}</h1>
    <img src="src/assets/logo.PNG" alt="Logo" width="300" height="300" />
    <h2 id="myGroups">My Groups</h2>
  </div>
  <!-- <div id="studyGroups">
    <button id="filesbutton" type="button" @click="getGroupData">
      displayGroup
    </button>
  </div> -->
  <div id="displayStudyGroups"></div>
</template>

<script>
import JoinGroup from "@/components/JoinGroup.vue";
import StudyGroupWidget from "@/components/StudyGroupWidget.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

console.log("in App");
export default {
  components: { StudyGroupWidget },
  name: "TheHomePage",
  data() {
    return {
      name: "Jason",
      email: "abc@abc.com",
      memberLimit: 6,
      userGroups: [],
    };
  },
  async mounted() {
    try {
      let userGroups = [];
      let userEmail = this.email;
      const groups = await getDocs(collection(db, "User"));
      let displayStudyGroups = document.getElementById("displayStudyGroups");
      console.log("test run");
      groups.forEach((group) => {
        let groupData = group.data();
        let user_email = groupData.Email;
        let user_groups = groupData.Groups;
        if (user_email == userEmail) {
          user_groups.forEach((user_group) => {
            console.log(user_group);
          });
          userGroups = user_groups;
        }
      });
      console.log(userGroups);
      this.userGroups = userGroups;

      const groupDetails = await getDocs(collection(db, "Group"));
      groupDetails.forEach((group) => {
        let groupData = group.data();
        let description = groupData.Description;
        let group_name = groupData.Name;
        let num_of_member = groupData.NumberOfMembers;
        let size = groupData.Size;

        if (this.userGroups.includes(group_name)) {
          console.log(
            "Displaying: ",
            description,
            group_name,
            num_of_member,
            size
          );
          let newDiv = document.createElement("div");
          newDiv.id = group_name;
          newDiv.innerHTML = `<router-link to='/'><button><h1>${group_name}</h1><br><h4>${description}</h4><br><h4>Members: ${num_of_member}/${size}</h4></button></router-link>`;
          // newDiv.innerHTML = '<router-link to="/TheCreateGroupPage"><button>TheHomePage</button></router-link>'
          newDiv.className = "groupDisplay";
          displayStudyGroups.appendChild(newDiv);
        }
      });

      console.log("getgroupdata test ", this.userGroups[0]);
    } catch (error) {
      console.error("Error joining group: ", error);
    }
  },
  methods: {
    test() {
      console.log("Hello");
    },
    async getGroupData() {
      console.log("IN AC");

      try {
        let userGroups = [];
        let userEmail = this.email;
        const groups = await getDocs(collection(db, "User"));
        let displayStudyGroups = document.getElementById("displayStudyGroups");
        console.log("test run");
        groups.forEach((group) => {
          let groupData = group.data();
          let user_email = groupData.Email;
          let user_groups = groupData.Groups;
          if (user_email == userEmail) {
            user_groups.forEach((user_group) => {
              console.log(user_group);
            });
            userGroups = user_groups;
          }
        });
        console.log(userGroups);
        this.userGroups = userGroups;

        const groupDetails = await getDocs(collection(db, "Group"));
        groupDetails.forEach((group) => {
          let groupData = group.data();
          let description = groupData.Description;
          let group_name = groupData.Name;
          let num_of_member = groupData.NumberOfMembers;
          let size = groupData.Size;

          if (this.userGroups.includes(group_name)) {
            console.log(
              "Displaying: ",
              description,
              group_name,
              num_of_member,
              size
            );
            let newDiv = document.createElement("div");
            newDiv.id = group_name;
            newDiv.innerHTML = `<router-link to='/'><button><h1>${group_name}</h1><br><h4>${description}</h4><br><h4>Members: ${num_of_member}/${size}</h4></button></router-link>`;
            // newDiv.innerHTML = '<router-link to="/TheCreateGroupPage"><button>TheHomePage</button></router-link>'
            newDiv.className = "groupDisplay";
            displayStudyGroups.appendChild(newDiv);
          }
        });

        console.log("getgroupdata test ", this.userGroups[0]);
      } catch (error) {
        console.error("Error joining group: ", error);
      }
    },
  },
};
</script>

<style></style>
