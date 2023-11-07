<template>
  <div id="everything">
    <div id="title">
      <h1 class="welcomeMsg">
        Welcome,
        <h1 class="name">
          <strong>{{ name }}</strong>
        </h1>
      </h1>
      <img src="src/assets/logo.PNG" alt="Logo" width="100" height="100" />
    </div>
    <h2 id="myGroups">My Groups</h2>

    <!-- <div id="studyGroups">
    <button id="filesbutton" type="button" @click="getGroupData">
      displayGroup
    </button>
  </div> -->

    <div id="displayGroups">
      <div
        class="groupDisplay"
        v-for="studyGroup in studyGroups"
        :key="studyGroup.name"
      >
        <router-link :to="`/TheStudyGroupPage/${studyGroup.name}`">
          <button>
            <h3>{{ studyGroup.name }}</h3>
            <br />
            <p>{{ studyGroup.description }}</p>
            <br />
            <p>{{ studyGroup.num_of_member }}/{{ studyGroup.size }} Members</p>
          </button>
        </router-link>
      </div>
    </div>

    <!-- <div id="testRouter"><button @click="gotoStudyPage">TestRouter</button></div>
  <router-link :to="`/TheStudyGroupPage/${this.userGroups[1]}`" id="testRouter"
    ><button>TestRouterParam</button></router-link
  > -->
  </div>
</template>

<script>
import JoinGroup from "@/components/JoinGroup.vue";
import StudyGroupWidget from "@/components/StudyGroupWidget.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
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
      studyGroups: [],
    };
  },
  async mounted() {
    await this.getGroupData();
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
            this.studyGroups.push({
              name: group_name,
              description: description,
              num_of_member: num_of_member,
              size: size,
            });
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
          }
        });

        console.log("getgroupdata test ", this.userGroups[0]);
      } catch (error) {
        console.error("Error joining group: ", error);
      }
    },
    gotoStudyPage() {
      this.$router.push({ path: "`/TheStudyGroupPage/${this.userGroups[0]}`" });
    },
  },
};
</script>

<style>
.name {
  color: #ffde59;
  display: flex;
  font-size: 40px;
  margin-left: 10px;
}
.welcomeMsg {
  font-size: 40px;
  display: flex;
  align-items: center;
  margin-left: 50px;
}
img {
  display: flex;
  margin-left: 10px;
}
#title {
  display: flex;
  align-items: center;
}
#myGroups {
  display: flex;
  margin-left: 50px;
  margin-top: -20px;
}
h1,
h3,
p {
  margin: 0px;
  padding: 0px;
}
#displayGroups {
  display: flex; /* Use flexbox to lay out children */
  flex-wrap: wrap; /* Allow children to wrap to next line */
  gap: 10px; /* Optional: adds space between children */
  justify-content: left; /* Center children horizontally in the container */
  align-items: left; /* Center children vertically in the container */
}
.groupDisplay button {
  border-radius: 10px; /* Rounded corners */
  background-color: #ffde59; /* Background color */
  padding: 20px; /* Space inside the rectangle */
  margin-bottom: 10px; /* Space below the rectangle, for when they wrap */
  box-sizing: border-box; /* Include padding and border in the width and height totals */
  flex: 0 1 auto; /* Don't grow, but allow to shrink and keep their auto base size */
  cursor: pointer;
  width: 383px; /* You can set a specific width or use a percentage */
  height: 250px; /* Height will be determined by the content size */
  /* font-family: Inter; */
}
button {
  background-color: #ffde59;
  border-color: #ffde59;
  margin: 0px;
  padding: 0px;
}
.groupDisplay:hover button:hover {
  background-color: #ffca2c; /* Slightly lighter shade when hovered */
}
</style>
