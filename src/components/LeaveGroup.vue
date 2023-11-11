<template>
  <div class="leave" @click="leaveGroup">
    <span class="material-icons" id="icon">exit_to_app</span>
    <button class="leaveButton" type="button">Leave Group</button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      user: false,
      email: "",
    };
  },
  props: {
    group: String,
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      }
    });
  },
  watch: {
    group: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.fetchData();
        }
      },
    },
  },

  methods: {
    async fetchData() {
      if (this.email) {
        return true;
      } else {
        return false;
      }
    },
    async leaveGroup() {
      console.log("IN AC");
      if (this.fetchData()) {
        try {
          if (confirm("Confirm leaving group?")) {
            const docS = await getDoc(doc(db, "Group", this.group));
            console.log(docS.data().NumberOfMembers);
            const docRef = await updateDoc(doc(db, "Group", this.group), {
              Members: arrayRemove(this.email), //this.email
              NumberOfMembers: docS.data().Members.length - 1,
            });
            await updateDoc(doc(db, "User", this.email), {
              Groups: arrayRemove(this.group),
            });
            console.log(docRef);
            alert("Left group successfully!");
            this.$emit("leaved");
            this.$router.push("/home");
          }
        } catch (error) {
          console.error("Error leaving group: ", error);
        }
      }
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
.leaveButton {
  font-family: "AbeeZee", Helvetica;
  text-align: center;
  background-color: #ffb904;
  color: white;
  border-radius: 6px;
  border: 1px solid #ffb904;
  width: 100px;
  display: inline-block;
}

#icon {
  font-size: 2rem;
  color: black;
  display: inline-block;
  margin-right: 2px;
}

.leave {
  width: fit-content;
  text-align: center;
  background-color: #ffb904;
  border-radius: 6px;
  border: 1px solid #ffb904;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
