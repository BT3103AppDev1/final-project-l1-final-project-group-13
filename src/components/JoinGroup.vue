<template>
  <button
    v-if="!requestPending"
    id="join"
    type="button"
    @click="joinGroup"
    :style="buttonStyle"
  >
    Join Group
  </button>
  <button
    v-else
    id="join"
    type="button"
    @click="alreadyJoined"
    :style="greyedOutStyle"
  >
    Request Pending
  </button>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      user: false,
      group: "BT3103",
      email: "6@gmail.com",
      requestPending: false,
      buttonStyle: {
        fontFamily: "AbeeZee",
        textAlign: "center",
        margin: "auto",
        borderRadius: "6px",
        padding: "8px",
        width: "160px",
        backgroundColor: "#FFB904",
        color: "white",
        border: "1px solid #FFB904",
      },
      greyedOutStyle: {
        fontFamily: "AbeeZee",
        textAlign: "center",
        margin: "auto",
        borderRadius: "6px",
        padding: "8px",
        width: "160px",
        backgroundColor: "grey",
        color: "white",
        border: "1px solid grey",
      },
    };
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        const check1 = (await getDoc(doc(db, "Group", this.group))).data()
          .Requests; //
        const flag1 = check1.includes(this.email); //
        const check2 = (await getDoc(doc(db, "Group", this.group))).data()
          .Members; //
        const flag2 = check2.includes(this.email); //
        this.requestPending = flag1 && flag2;
      }
    });
    const check1 = (await getDoc(doc(db, "Group", this.group))).data().Requests; //
    const flag1 = check1.includes(this.email); //
    const check2 = (await getDoc(doc(db, "Group", this.group))).data().Members; //
    const flag2 = check2.includes(this.email); //
    console.log(flag2);
    this.requestPending = flag1 || flag2;
  },
  methods: {
    async joinGroup() {
      console.log("IN AC");
      try {
        const docRef = await updateDoc(doc(db, "Group", this.group), {
          Requests: arrayUnion(this.email),
        });
        console.log(docRef);
        alert("Submitted request!");
        this.requestPending = true;
        const noti = {
          title: this.email /*this.user.name*/ + " has sent a request to join " + this.group + " study group",
          time: this.formatDate(new Date()),
        };
        const member = (await getDoc(doc(db, "Group", this.group))).data().Members;
        console.log(4);
        for (let i = 0; i < member.length; i++) {
          await updateDoc(doc(db, "User", member[i]), {
            Notifications: arrayUnion(noti),
          });
        }
        this.$emit("joined");
      } catch (error) {
        console.error("Error joining group: ", error);
      }
    },

    alreadyJoined() {
      alert("You have already sent your request!");
    },

    formatDate(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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

<style>
#join {
  font-family: "AbeeZee", Helvetica;
  text-align: center;
  margin: auto;
  background-color: #ffb904;
  color: white;
  border-radius: 6px;
  border: 1px solid #ffb904;
  padding: 8px;
  width: 160px;
}
</style>
