<template>
  <h1 class="createGroupMsg">Create Group</h1>
  <div id="everything">
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
      <button id="saveButton" type="button" @click="saveData">
        Create Group
      </button>
      <h2 class="output"></h2>
    </div>
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
    return {
      myName: "brandonlsl010911@gmail.com",
    };
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
      let groups = await getDocs(collection(db, "Group"));
      // if (groups.data().includes(groupName)) {
      //   alert("Group already exists");
      // } else {
      let docRef = doc(db, "Group", groupName);
      let data = {
        Description: groupDetails,
        Members: [this.myName],
        Name: groupName,
        NumberOfMembers: "1",
        Requests: "",
        Size: groupMemberLimit,
      };
      await setDoc(docRef, data);
      alert("set data successfully!");
      // }
    },
  },
};
</script>

<style>
.groupDetails {
  text-align: center;
  align-items: center;
  height: 120%;
  width: 80%;
  margin: auto;
  background-color: rgb(201, 201, 201);
  border-radius: 10px; /* Rounded corners */
  padding: 20px; /* Space inside the rectangle */
  margin-bottom: 10px; /* Space below the rectangle, for when they wrap */
  box-sizing: border-box; /* Include padding and border in the width and height totals */
  flex: 0 1 auto; /* Don't grow, but allow to shrink and keep their auto base size */
  cursor: pointer;
}
input:hover {
  box-shadow: 3px 3px purple;
  border-radius: 2px;
}
#saveButton {
  border-radius: 10px; /* Rounded corners */
  background-color: #ffde59; /* Background color */
  padding: 20px; /* Space inside the rectangle */
  margin-bottom: 10px; /* Space below the rectangle, for when they wrap */
  box-sizing: border-box; /* Include padding and border in the width and height totals */
  flex: 0 1 auto; /* Don't grow, but allow to shrink and keep their auto base size */
  cursor: pointer;
  width: 300px; /* You can set a specific width or use a percentage */
  height: 70px; /* Height will be determined by the content size */
  /* font-family: Inter; */
}
#saveButton:hover {
  box-shadow: 3px 3px purple;
  border-radius: 2px;
}
label {
  font-size: larger;
  display: inline-block;
  width: 14%;
  text-align: right;
}
input {
  display: inline-block;
  text-align: left;
  border-radius: 10px;
  border: 1px solid #968888;
  padding: 10px;
  margin: 0px;
}
.createGroupMsg {
  font-size: 40px;
  display: inline-block;
  align-items: center;
  margin-bottom: 30px;
}
#everything {
  display: flex; /* Use flexbox to lay out children */
  flex-wrap: wrap; /* Allow children to wrap to next line */
  gap: 10px; /* Optional: adds space between children */
  justify-content: left; /* Center children horizontally in the container */
  align-items: left; /* Center children vertically in the container */
}
input {
  height: 50px;
  width: 500px;
  margin: 0px;
  padding: 0px;
  margin-left: 20px;
  text-align: center;
}
#groupDetails {
  height: 200px;
}
</style>
