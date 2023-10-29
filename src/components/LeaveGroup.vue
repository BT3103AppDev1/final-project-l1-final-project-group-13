<template>
    <div class = leave>
    <span class="material-icons" id = "icon">exit_to_app</span>
    <button class = "leaveButton" type = "button" @click="leaveGroup"> Leave Group</button>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '../firebase.js'
import {getFirestore} from "firebase/firestore"
import {doc, getDoc, setDoc, updateDoc, arrayRemove} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    data() {
    return {
      user: false,
      group: "BT3103",
      email: ""
    };
  },
   mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email
      }
    })
},

    methods: {
        async leaveGroup() {
            console.log("IN AC")

            try {
                const docS = await getDoc(doc(db, "Group", this.group));
                console.log(docS.data().NumberOfMembers);
                const docRef = await updateDoc(doc(db, "Group", this.group), {
                    Members: arrayRemove("e0735448@u.nus.edu"), //this.email
                    NumberOfMembers: docS.data().Members.length - 1,
                })
                console.log(docRef)
                alert("Leaved group successfully!")
                this.$emit("leaved");
            }
            catch(error) {
                console.error("Error leaving group: ", error);
            }
        }
    }
}
</script>

<style>
.leaveButton {
  font-family: 'AbeeZee', Helvetica;
  text-align: center;
  background-color: #FFB904;
  color: white;
  border-radius: 6px;
  border: 1px solid #FFB904;
  width: 100px;
  display: inline-block;
}

#icon{
  font-size: 2rem;
  color: black;
  display: inline-block;
  margin-right: 2px;
}

.leave {
  width: fit-content;
  text-align: center;
  background-color: #FFB904;
  border-radius: 6px;
  border: 1px solid #FFB904;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>


