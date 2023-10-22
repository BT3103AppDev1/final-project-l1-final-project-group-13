<template>
    <button id = "join" type = "button" @click="joinGroup"> Join Group</button>
</template>

<script>
import firebaseApp from '../firebase.js'
import {getFirestore} from "firebase/firestore"
import {doc, setDoc, updateDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods: {
        async joinGroup() {
            console.log("IN AC")

            try {
                const docRef = await updateDoc(doc(db, "Group", "BT3103"), {
                    requests: arrayUnion("brandonlsl010911@gmail.com")
                })
                console.log(docRef)
                alert("Joined successfully!")
            }
            catch(error) {
                console.error("Error adding document: ", error);
            }
        }
    }
}
</script>


