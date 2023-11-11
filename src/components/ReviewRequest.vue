<template>
    <div id = "description">
    <h3>{{ num }} request(s) to join the group:</h3>
  </div>
    <br />
    <table id="table">
      <tr v-for="(row, rowIndex) in groupedUsers" :key="rowIndex">
        <td v-for="(user, userIndex) in row" :key="user.Email">
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
                  <strong>{{ user.Name }} </strong>
                </h4>
                <p>{{ user.Email }}</p>
                <p>{{ user.TelegramHandle }}</p>
              </div>
            </div>
            <p>{{ formatCourses(user.Major) }}</p>
            <p>{{ formatCourses(user.Courses) }}</p>
            <p>{{ formatCourses(user.Timing) }}</p>
            <p>{{ formatCourses(user.Location) }}</p>
            <br />
            <div id="buttons">
              <img
                id="accept"
                src="@/assets/acceptIcon.png"
                alt="Accept Request"
                @click="accept(user.Email)"
              />
              <img
                style="margin-left: 2em"
                id="reject"
                src="@/assets/rejectIcon.png"
                alt="Reject Request"
                @click="reject(user.Email)"
              />
            </div>
          </div>
        </td>
      </tr>
    </table>


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

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      num: 0,
      user: false,
      request: [],
      users: [],
      email: "",
    };
  },
  props: {
    group: String,
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      }
    });
  },
  watch: {
    group: {
      handler(value) {
        if (value) {
          this.fetchData();
        }
      },
      immediate: true,
    },
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
    async fetchData() {
      console.log(this.group);
      let document = await getDoc(doc(db, "Group", this.group));
      let documentRequest = document.data().Requests;
      this.num = documentRequest.length;
      this.request = documentRequest;

      for (let i = 0; i < documentRequest.length; i++) {
        let a = (await getDoc(doc(db, "User", documentRequest[i]))).data();
        this.users.push(a);
      }
      console.log(this.users);
    },
    async accept(email) {
      console.log("accepting");
      console.log(email);
      if (email) {
        try {
          const docS = await getDoc(doc(db, "Group", this.group));
          console.log(docS.data().NumberOfMembers);
          const docRef = await updateDoc(doc(db, "Group", this.group), {
            Members: arrayUnion(email),
            Requests: arrayRemove(email),
            NumberOfMembers: docS.data().Members.length + 1,
          });

          await updateDoc(doc(db, "User", email), {
            Groups: arrayUnion(this.group),
          });
          let memberName = (await getDoc(doc(db, "User", email))).data().Name;
          alert("Accepted!");
          const noti = {
            title: memberName + " has joined " + this.group + " study group",
            time: this.formatDate(new Date()),
          };
          const member = (await getDoc(doc(db, "Group", this.group))).data()
            .Members;
          console.log(5);
          for (let i = 0; i < member.length; i++) {
            await updateDoc(doc(db, "User", member[i]), {
              Notifications: arrayUnion(noti),
            });
          }
          this.$emit("reviewed");
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
          this.$emit("reviewed");
        } catch (error) {
          console.error("Error rejecting request: ", error);
        }
      } else {
        console.error("Email is undefined or null");
      }
    },

    formatCourses(value) {
      return value.filter(Boolean).join(", ");
    },

    formatDate(date) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = String(date.getDate()).padStart(2, "0");
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours %= 12;
      hours = hours ? hours : 12;

      const formattedDate = `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
      return formattedDate;
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
  text-align: left; /* Change to left alignment */
  margin-bottom: 20px; /* Add margin for spacing */
  margin-left: 20px;
}
.card{
  border: 1px solid #ffde59;
  border-radius: 20px;
  padding: 3px 10px 3px 10px;
  width: 360px;
  height: 400px;
  text-align: left;
  background-color: #ffde59;
  margin-left: auto;
  margin-right: auto;
  margin: 15px;
  position: relative; 
}

td,
tr {
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

.account {
  flex-grow: 1;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; /* Display ellipsis (...) for overflowed text */
  max-width: 200px; /* Adjust the value based on your design */
}

#requests {
  margin: auto;
  background-color: white;
  font-family: "AbeeZee", Helvetica;
  font-weight: 400;
}

#table {
  margin-left: auto;
  margin-right: auto;
}

#accept,
#reject {
  height: 40px;
  width: 40px;
  cursor: pointer;
}

#buttons {
  position: absolute; /* Set absolute positioning for the buttons */
  bottom: 10px; /* Adjust the bottom position as needed */
  left: 50%; /* Align the buttons at the horizontal center of the card */
  transform: translateX(-50%); /* Center the buttons using a transform */
  text-align: center;
}


</style>
