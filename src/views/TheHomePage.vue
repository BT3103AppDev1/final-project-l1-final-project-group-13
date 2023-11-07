<template>
  <div class = "sidebar">
  <Sidebar/>
  </div>
  <Notification/>
  <div id="homepageTitle">
    <h1 class="welcomeMsg">
      Welcome,
      <h1 class="name">
        {{ name }}
      </h1>
    </h1>
    <img src="src/assets/profileIcon.png" alt="Logo" width="100" height="100" />
  </div> <br>
  <h2 id="myGroups">My Groups</h2>

  <!-- <div id="studyGroups">
    <button id="filesbutton" type="button" @click="getGroupData">
      displayGroup
    </button>
  </div> -->

  <table id="table">
      <tr v-for="(row, rowIndex) in groupedGroups" :key="rowIndex">
        <td v-for="(group, groupIndex) in row" :key="group.Name">
          <div class="card" @click = "gotoStudyPage(group.name)">
            <p> {{  group.Name }}</p>
            <p> {{  group.Description }}</p>
            <p> {{  group.NumberOfMembers }} / {{ group.Size }}</p>
            </div>
            </td>
            </tr>
            </table>
      

  <!-- <div id="testRouter"><button @click="gotoStudyPage">TestRouter</button></div>
  <router-link :to="`/TheStudyGroupPage/${this.userGroups[1]}`" id="testRouter"
    ><button>TestRouterParam</button></router-link
  > -->
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
import Sidebar from "@/components/Sidebar.vue"
import Notification from "@/components/Notification.vue"
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
        console.log(this.email)
        this.name = (await getDoc(doc(db, "User", this.email))).data().Name
        console.log(this.name)
        let groups = (await getDoc(doc(db, "User", this.email))).data().Groups
    console.log(groups)
    for (let i = 0; i < groups.length; i++) {
      let a = (await getDoc(doc(db, "Group", groups[i]))).data();
      this.studyGroups.push(a);
    }
      }
    });
  },
  methods: {
    
   
            // let newDiv = document.createElement("div");
            // newDiv.id = group_name;
            // newDiv.innerHTML = `<button @click='gotoStudyPage'><h1>${group_name}</h1><br><h4>${description}</h4><br><h4>Members: ${num_of_member}/${size}</h4></button>`;
            // // newDiv.innerHTML = '<router-link to="/TheCreateGroupPage"><button @click='gotoStudyPage'>TheHomePage</button></router-link>'
            // newDiv.className = "groupDisplay";
            // newDiv.addEventListener("click", function () {
            //   alert("clicked " + group_name);
            //   gotoStudyPage();
            // });
            // displayStudyGroups.appendChild(newDiv);
      gotoStudyPage(link) {
        this.$router.push({ path: `/TheStudyGroupPage/${link}` });
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
  }
</script>

<style>
.name {
  color: #FFB904;
  display: flex;
  font-size: 40px;
  margin-left: 10px;
}
.welcomeMsg {
  font-size: 40px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  color:black;
  font-family: "AbeeZee", Helvetica;
}
img {
  display: flex;
  margin-left: 10px;
}
#homepageTitle {
  display: flex;
  align-items: center;
  font-family: "AbeeZee", Helvetica;
}
#myGroups {
  display: flex;
  margin-left: 235px;
  margin-top: -20px;
  font-family: "AbeeZee", Helvetica;
  color: black;
}
h1, h3, p {
  margin: 0px;
  padding: 0px;
}

</style>
