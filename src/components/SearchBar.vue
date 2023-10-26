<template>
    <!-- length and size to be decided afterwards -->
    <input type="text" id="text_tobe_searched" name="text_tobe_searched" required minlength="4" maxlength="8" size="10">
    <button id = "search" type = "button" @click="search_By_text">search</button>
    <div id = "displayer"></div>    
</template>




<script>
import firebaseApp from '../firebase.js'
import {getFirestore} from "firebase/firestore"
import {doc, setDoc, updateDoc, arrayUnion, getDocs,collection} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    data() { 
    return { 
        user: false,
        useremail: ''
    } 
},

async mounted() {
    //get user and credentials, probably dont need this bc search dont require user, filter need it. 
    const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.useremail = user.email;
            }
        })
    // this function is different from method, this is to be loaded when the page is reached
    this.search_By_text();


    
},
methods: {
    //this function is to search when the user press the search button. 
    async search_By_text() {
        let valid_groups = []
        let text = document.getElementById("text_tobe_searched").value.toLowerCase()
        const groups = await getDocs(collection(db, "Group"))
        let displayer = document.getElementById('displayer');
        displayer.innerHTML = '';
        groups.forEach((group)=> {
            let groupData = group.data();
            let description = groupData.Description;
            let group_name = groupData.Name;
            let num_of_member = groupData.NumberOfMembers;
            let size = groupData.Size;
            if (description.toLowerCase().includes(text) || group_name.toLowerCase().includes(text)) {
                valid_groups.push(groupData)
                console.log("Displaying: " + group_name)
                let newDiv = document.createElement('div');
                newDiv.id = group_name;
                newDiv.innerHTML = 
                `<strong>${group_name}</strong><br>${description}<br>Members: ${num_of_member}/${size}`;
                newDiv.className = 'groupDisplay';
                displayer.appendChild(newDiv)
            }
            
        })
    }
}
}
</script>
