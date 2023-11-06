<template>
  <main id="TestComponent">
    <h1 id="mainHead">Test Page</h1>
    <div id="pagecontent">
      Celine is testing her navigation bar.
      <br />
      She is still testing her navigation bar.
    </div>
  </main>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "TestComponent",
  components: {
    Sidebar,
  },

  data() {
    user: false;
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
      } else {
        this.$router.push("/login");
      }
    });
  },
};
</script>

<style scoped></style>
