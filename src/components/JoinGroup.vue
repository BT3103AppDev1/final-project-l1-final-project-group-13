<template>
    <button id = "join" type = "button" @click="joinGroup"> Join Group</button>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '../firebase.js'
import {getFirestore} from "firebase/firestore"
import {doc, setDoc, updateDoc, arrayUnion} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    data() {
    return {
      user: false,
      group: "BT3103",
      email: "abc@abc.com"
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
        async joinGroup() {
            console.log("IN AC")
            try {
                const docRef = await updateDoc(doc(db, "Group", this.group), {
                    Requests: arrayUnion(this.email)
                })
                console.log(docRef)
                alert("Submitted request!")
                this.$emit("joined");
                document.getElementById("join").style.backgroundColor = 'grey';
                document.getElementById("join").style.border = '1px solid grey';
                document.getElementById("join").innerHTML = "Request Pending"

            }
            catch(error) {
                console.error("Error joining group: ", error);
            }
        }
    }//need to check if user exits and enters the page again - button should be grey
}
</script>

<style>
#join {
    font-family: 'AbeeZee', Helvetica;
    text-align: center;
  margin: auto;
  background-color: #FFB904;
  color:white;
  border-radius: 6px;
  border: 1px solid #FFB904;
  padding: 8px;
  width: 160px
}
</style>


