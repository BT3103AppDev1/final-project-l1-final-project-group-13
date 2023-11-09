<template>
  <main>
    <div id="homepageTitle">
      <h1 class="welcomeMsg">
        Welcome,
        <h1 class="name">
          {{ name }}
        </h1>
      </h1>
      <img
        src="src/assets/profileIcon.png"
        alt="Logo"
        width="100"
        height="100"
      />
    </div>
    <br />
    <h2 id="myGroups">My Groups</h2>

    <table id="table">
      <tr v-for="(row, rowIndex) in groupedGroups" :key="rowIndex">
        <td v-for="(group, groupIndex) in row" :key="group.Name">
          <div class="card" @click="gotoStudyPage(group.Name)">
            <p>{{ group.Name }}</p>
            <p>{{ group.Description }}</p>
            <p>{{ group.NumberOfMembers }} / {{ group.Size }}</p>
          </div>
        </td>
      </tr>
    </table>
  </main>
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
  name: "HomeComponent",
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
        const docRef = await getDoc(doc(db, "User", String(user.email)));

        if (docRef.exists()) {
          let data = docRef.data();

          // HAVE NOT COMPLETED STEP 2 OF ACCOUNT CREATION
          if (!data.Major) {
            this.$router.push("/createaccount2");
          }
          // Completed account creation
          else {
            return false;
          }
        } else {
          this.$router.push("/createaccount1");
        }
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
      } else {
        this.$router.push("/");
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
.container {
  display: flex;
}

.name {
  color: #ffb904;
  display: flex;
  font-size: 40px;
  margin-left: 10px;
}
.welcomeMsg {
  font-size: 40px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  color: black;
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
h1,
h3,
p {
  margin: 0px;
  padding: 0px;
}

main {
  height: auto;
  width: 100vw;
}
</style>
