<template>
    <button id = "leave" type = "button" @click="leaveGroup"> Leave Group</button>
    <h1> test</h1>
</template>

<script>
import firebaseApp from '../firebase.js'
import {getFirestore} from "firebase/firestore"
import {doc, setDoc, updateDoc, arrayRemove} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods: {
        async leaveGroup() {
            console.log("IN AC")

            try {
                const docRef = await updateDoc(doc(db, "Group", "BT3103"), {
                    Members: arrayRemove("e0735448@u.nus.edu")
                })
                console.log(docRef)
                alert("Leaved group successfully!")
            }
            catch(error) {
                console.error("Error leaving group: ", error);
            }
        }
    }
}
</script>


