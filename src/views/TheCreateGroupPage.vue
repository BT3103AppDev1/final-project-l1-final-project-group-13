<template>
  <h1>Create Group</h1>
  <div class="groupDetails">
    <label for="groupName">Group Name: </label>
    <input
      type="text"
      id="groupName"
      placeholder="Not more than 50 characters"
      required=""
    />
    <br />
    <br />
    <label for="groupMemberLimit">Group Size: </label>
    <input
      type="number"
      id="groupMemberLimit"
      placeholder="Enter your group member limit"
      required=""
    />
    <br />
    <br />
    <label for="groupDetails">Group Description: </label>
    <input
      type="text"
      id="groupDetails"
      placeholder="Not more than 150 characters"
      required=""
    />
    <br />
    <br />
    <button id="saveButton" type="button" @click="saveData">Create Group</button>
    <h2 class="output"></h2>
  </div>
</template>

<script>
import JoinGroup from "@/components/JoinGroup.vue";
import firebaseApp from "../firebase.js";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

console.log("in App");
export default {
  data() {
    this.myName = "brandonlsl010911@gmail.com";
  },
  methods: {
    test() {
      console.log("Hello");
    },
    async saveData() {
      console.log("savedata");
      let groupName = document.getElementById("groupName").value;
      let groupDetails = document.getElementById("groupDetails").value;
      let groupMemberLimit = document.getElementById("groupMemberLimit").value;
      console.log(groupName, groupDetails, groupMemberLimit);
      let docRef = doc(db, "Group", groupName);
      let data = {
        Description: groupDetails,
        Members: [this.myName, ],
        Name: groupName,
        NumberOfMembers: "1",
        Requests: "",
        Size: groupMemberLimit,
      };
      await setDoc(docRef, data);
      alert("set data successfully!");

    },
  },
};
</script>

<style></style>
