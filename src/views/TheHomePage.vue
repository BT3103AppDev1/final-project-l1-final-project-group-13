<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification />
    </div>
    <div class="content">
      <div class="header">
        <h1 class="welcomeMsg">Welcome,</h1>
        <h1 class="name">{{ name }} </h1>
        <img src="src/assets/profileIcon.png" alt="Logo" width="100" height="100" />
      </div>
      <br />
      <h2 id="myGroups">My Groups</h2> <br><br>

      <div v-if = "this.studyGroups.length == 0" class = "no_group_at_all"> Join or create a group now!</div>


      <div id="displayer" class="groupss">
        <div class="groupDisplay" v-for="group in studyGroups" :key="group.Name" @click="gotoStudyPage(group.Name)">
          <strong>{{ group.Name }}</strong>{{ format_group_des(group.Description) }}<br />
          <div class="members">Members: {{ group.NumberOfMembers }} / {{ group.Size }}</div>
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
import JoinGroup from "@/components/JoinGroup.vue";
import StudyGroupWidget from "@/components/StudyGroupWidget.vue";
import { useRouter } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Notification from "@/components/Notification.vue";
const router = useRouter();
const db = getFirestore(firebaseApp);

console.log("in App");
export default {
  components: { StudyGroupWidget, Sidebar, Notification },
  name: "TheHomePage",
  data() {
    return {
      user: false,
      name: "",
      email: "",
      memberLimit: 6,
      studyGroups: [],
    };
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        console.log(this.email);
        this.name = (await getDoc(doc(db, "User", this.email))).data().Name;
        console.log(this.name);
        let groups = (await getDoc(doc(db, "User", this.email))).data().Groups;
        console.log(groups);
        for (let i = 0; i < groups.length; i++) {
          let a = (await getDoc(doc(db, "Group", groups[i]))).data();
          this.studyGroups.push(a);
        }
      }
    });
  },
  methods: {
    gotoStudyPage(name) {
      if (!name) {
        console.error("Empty parameter passed for 'name'.");
        return; // Optionally, throw an error or log a warning message
      }

      this.$router.push({
        name: "StudyGroupPage",
        params: { groupName: name },
      });
    },
    format_group_des(str) {
      let max_len = 93
      // Check if the string length is greater than max_len
      if (str.length > max_len) {
        // If so, slice the string to max_len - 3 and add "..."
        return str.slice(0, max_len - 3) + "...";
      } else if (str.length < max_len) {
        // If the string is shorter, add spaces until it reaches max_len
        return str.padEnd(max_len, " ");
      }
      // If the string length is equal to max_len, return it as is
  return str;
    },
  },

  computed: {
    groupedGroups() {
      const result = [];
      const chunkSize = 3;
      for (let i = 0; i < this.studyGroups.length; i += chunkSize) {
        result.push(this.studyGroups.slice(i, i + chunkSize));
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

.notification-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.content {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.header {
  display: flex;
  align-items: center;
}

.welcomeMsg {
  margin-right: 10px;
}

.name {
  color: #FFB904;
  margin-right: 30px;
}

#myGroups {
  margin-top: 20px;
  display: flex;
}

#displayer {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.groupDisplay {
  border-radius: 10px; /* Rounded corners */
  background-color: #ffde59; /* Background color */
  padding: 20px; /* Space inside the rectangle */
  margin-bottom: 10px; /* Space below the rectangle, for when they wrap */
  box-sizing: border-box; /* Include padding and border in the width and height totals */
  cursor: pointer;
  width: 380px; /* Set a specific width */
  height: 240px; /* Adjust height to auto to fit content */
  /* Remove flex properties if this is not a flex container */
  /* font-family: Inter; */

  /* Add text wrapping properties */
  word-wrap: break-word;

  display: flex;            /* Establish flex container */
  flex-direction: column;   /* Stack children vertically */
  justify-content: space-between;
}

.members {
  width: 100%;
}

.groupDisplay:hover {
  background-color: #ffca2c;
}

.no_group_at_all {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.group_description {
  word-wrap: break-word;
}
</style>