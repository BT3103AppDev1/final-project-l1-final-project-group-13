<template>
    <h1>Test</h1>
    <div class="groupDetails">
        <label for="groupName">Group Name: </label>
        <input type='text' id="groupName" placeholder="Enter your group name" required=""> <br> <br>
        <label for="groupMemberLimit">Group Size: </label>
        <input type='number' id="groupMemberLimit" placeholder="Enter your group member limit" required=""> <br> <br>
        <label for="groupDetails">Group Description: </label>
        <input type='text' id="groupDetails" placeholder="Enter your group details" required=""> <br> <br>
        <button id="saveButton" type="button" @click="saveData">Save</button>
        <h2 class="output"></h2>
    </div>
</template>
  
  <script>
  import JoinGroup from '@/components/JoinGroup.vue'
  import firebaseApp from '../firebase.js';
  import { getFirestore } from "firebase/firestore"
  import { doc, setDoc } from "firebase/firestore";
  
  console.log("in App");
  export default {
    name: "TheCreateGroupPage",
    data() {
        this.name = 'Me';
    },
    methods: {
      test() {
        console.log('Hello');
      },
      saveData() {
        console.log('savedata');
        let groupName  = document.getElementById("groupName").value
        let groupDetails  = document.getElementById("groupDetails").value
        let groupMemberLimit  = document.getElementById("groupMemberLimit").value
        console.log(groupName, groupDetails, groupMemberLimit);
        alert(groupName + groupDetails + groupMemberLimit);
    }
  }
};
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #0f56c7;
  }
  </style>
  