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
        <JoinGroup :group="this.groupName" />
      </div>
    </div>
  </div>
</template>

<script>
import JoinGroup from "@/components/JoinGroup.vue";
import { firebaseApp } from "../firebase.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Notification from "@/components/Notification.vue";
import Sidebar from "@/components/Sidebar.vue";

const db = getFirestore(firebaseApp);

console.log("in App");
export default {
  components: { JoinGroup, Sidebar, Notification, JoinGroup },
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
    };
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.group = (
          await getDoc(doc(db, "Group", this.$route.params.groupName))
        ).data();
        console.log(this.group);
        this.groupName = this.group.Name;
        this.groupDescription = this.group.Description;
        this.groupMember = this.group.NumberOfMembers;
        this.groupSize = this.group.Size;
        this.membersEmail = this.group.Members;

        for (let i = 0; i < this.membersEmail.length; i++) {
          let a = (await getDoc(doc(db, "User", this.membersEmail[i]))).data();
          this.members.push(a);
        }
      }
    });
  },
  methods: {
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
h1, h2, h3, h4, h5, h6, p {
  color: #000;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
}

#description {
  display: inline-block;
  text-align: left;
  margin-bottom: 20px; 
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
  overflow-x: auto;
}

#title {
  display: inline-block;
  text-align: left; 
  margin-bottom: 20px; 
  margin-left: 20px; 
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
  overflow-x: auto;
} 

.notification-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
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
  height: 360px;
  text-align: left;
  background-color: #ffde59;
  margin-left: auto;
  margin-right: auto;
  margin: 15px;
}

.account {
  flex-grow: 1;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 200px; 
}

td,
tr {
  text-align: right;
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

</style>
