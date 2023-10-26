<template>
  <div id="requests">
    <h4>{{ num }} request(s) to join the group</h4> <br>
    <table id = "table">
      <tr v-for="(row, rowIndex) in groupedUsers" :key="rowIndex">
        <td v-for="(user, userIndex) in row" :key="user.Email">
          <div class="card">
            <div class = "profile"> 
              <div class = "picture">
                <img class = "img" src="@/assets/profileIcon.png" alt="Profile picture">
              </div>
              <div class = "account">
                <h3> <strong>{{ user.Name }} </strong></h3>
            <p> {{ user.Email }}</p>
            <p> {{ user.TelegramHandle }}</p>
              </div>
            </div>
            <p> {{ formatCourses(user.Major) }}</p>
            <p> {{ formatCourses(user.Courses) }}</p>
            <p> {{ formatCourses(user.StudyTiming) }}</p>
            <p> {{ formatCourses(user.Location) }}</p>
            <br><br>
            <button id="acceptButton" type="button" @click="accept(user.Email)">Accept</button>
            <button style="margin-left: 1em;" id="rejectButton" type="button" @click="reject(user.Email)">Reject</button> <br>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import {
  getDoc,
  getFirestore,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      num: 0,
      request: [],
      users: [],
      group: "BT3103",
    };
  },

  async mounted() {
    let document = await getDoc(doc(db, "Group", "BT3103"));
    let documentRequest = document.data().Requests;
    this.num = documentRequest.length;
    this.request = documentRequest;

    for (let i = 0; i < documentRequest.length; i++) {
      let a = (await getDoc(doc(db, "User", documentRequest[i]))).data();
      this.users.push(a);
    }
    console.log(this.users);
  },
  computed: {
    groupedUsers() {
      const result = [];
      const chunkSize = 3;
      for (let i = 0; i < this.users.length; i += chunkSize) {
        result.push(this.users.slice(i, i + chunkSize));
      }
      return result;
    },
  },

  methods: {
    async accept(email) {
      console.log("accepting");
      console.log(email);
      if (email) {
        try {
          const docS = await getDoc(doc(db, "Group", this.group))
          console.log(docS.data().NumberOfMembers)
          const docRef = await updateDoc(doc(db, "Group", this.group), {
            Members: arrayUnion(email),
            Requests: arrayRemove(email),
            NumberOfMembers: docS.data().Members.length + 1
          });
          alert("Accepted!");
        } catch (error) {
          console.error("Error accepting request: ", error);
        }
      } else {
        console.error("Email is undefined or null");
      }
    },

    async reject(email) {
      console.log("rejecting");
      console.log(email);
      if (email) {
        try {
          const docRef = await updateDoc(doc(db, "Group", this.group), {
            Requests: arrayRemove(email),
          });
          alert("Rejected!");
        } catch (error) {
          console.error("Error rejecting request: ", error);
        }
      } else {
        console.error("Email is undefined or null");
      }
    },

    formatCourses(value) {
      return value.filter(Boolean).join(", ");
    }
  },
};
</script>

<style>
  .card {
    border: 1px solid #ccc;
    padding: 30px;
    border-radius: 5px;
    margin: 20px;
    width: 320px; /* Adjust the width as needed */
    height: 350px;
    text-align: left;
  }

  #acceptButton,
  #rejectButton {
    margin-top: 10px;
  }

  td,tr {
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

  .account{
    text-align: left;
  }

  #request {
    text-align: center;
    margin: auto;
  }

  #table {
    margin-left: auto;
    margin-right: auto;
  }
</style>
