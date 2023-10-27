<template>
    <div class ="request">
  <h1>{{ group.Name }}</h1>
  <ReviewRequest :key = "refreshComp" @reviewed = "change"/>
</div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import {
  getDoc,
  getFirestore,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
} from "firebase/firestore";
import ReviewRequest from "@/components/ReviewRequest.vue";

const db = getFirestore(firebaseApp);

export default {
  name: "RequestPage",
  components: {
    ReviewRequest,
  },
  data() {
    return {
      user: false,
      group: "",
      refreshComp: 0
    };
  },

  async mounted() {
    let document = await getDoc(doc(db, "Group", "BT3103"));
    this.group = document.data();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    change() {
      this.refreshComp += 1
    }
  }
};
</script>

<style>
.request{
    font-family: 'AbeeZee';
    color:black;
}
</style>
