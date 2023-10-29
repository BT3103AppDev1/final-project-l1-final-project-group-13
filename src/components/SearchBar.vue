<template>
    <!-- length and size to be decided afterwards -->
    <input class = "search_bar" 
    type="text" 
    id="text_tobe_searched" 
    name="text_tobe_searched"
    placeholder="Search for groups">
    <!-- <Vueform>
    <TextElement name="text"/>
    </Vueform> -->
    <button id = "search" type = "button" @click="search_By_text">search</button>
    <br><br>
    <div class="dropdowns_container">
    <div class="dropdown_list">
      <Multiselect
        v-model="selected_major"
        mode="tags"
        placeholder="major"
        :options="options_major"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
    </div>
    <div class="dropdown_list">
      <Multiselect
        v-model="selected_course"
        mode="tags"
        placeholder="course"
        :options="options_course"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
    </div>
    <div class="dropdown_list">
      <Multiselect
        v-model="selected_timing"
        mode="tags"
        placeholder="timing"
        :options="options_timing"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
    </div>
    <div class="dropdown_list">
      <Multiselect
        v-model="selected_location"
        mode="tags"
        placeholder="location"
        :options="options_location"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
    </div>
    </div>
    <br><br>
    <div id = "displayer"></div>

</template>




<script>
import firebaseApp from '../firebase.js'
import {getFirestore} from "firebase/firestore"
import {getDoc,doc, setDoc, updateDoc, arrayUnion, getDocs,collection} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Multiselect from '@vueform/multiselect'
// import en from '@vueform/vueform/locales/en'
// import vueform from '@vueform/vueform/themes/vueform'
// import '@vueform/vueform/themes/vueform/css/index.min.css';
// import Vueform from '@vueform/vueform'
// import Builder from '@vueform/builder'

const db = getFirestore(firebaseApp);

export default {
    components: {
        Multiselect,
        // Vueform,
        // // Builder,
        // vueform
  },
    data() { 
    return { 
        user: false,
        useremail: '',
        selected_major: [],
        selected_course: [],
        selected_timing: [],
        selected_location: [],
        options_major: [],
        options_course: [],
        options_timing: [],
        options_location: []
    } 
},

async mounted() {
    // populate major list
    let docRef = doc(db, "Preference_info_instances", "Major");
    let docSnap = await getDoc(docRef);
    let data = docSnap.data();
    Object.keys(data).forEach(key => {
        let values = data[key];
        let obj = {label:key,options:values}
        this.options_major.push(obj)
    });

    // populate course list
    docRef = doc(db, "Preference_info_instances", "Course");
    docSnap = await getDoc(docRef);
    data = docSnap.data();
    Object.keys(data).forEach(key => {
        let values = data[key];
        let obj = {label:key,options:values}
        this.options_course.push(obj)
    });

    // populate timing list
    docRef = doc(db, "Preference_info_instances", "Timing");
    docSnap = await getDoc(docRef);
    data = docSnap.data();
    Object.keys(data).forEach(key => {
        let values = data[key];
        let obj = {label:key,options:values}
        this.options_timing.push(obj)
    }); 

    // populate location list
    docRef = doc(db, "Preference_info_instances", "Location");
    docSnap = await getDoc(docRef);
    data = docSnap.data();
    Object.keys(data).forEach(key => {
        let values = data[key];
        let obj = {label:key,options:values}
        this.options_location.push(obj)
    });  
    this.search_By_text();
    // console.log("mounted running") 
},
methods: {
    //this function is to search when the user press the search button. 
    async search_By_text() {
        let valid_groups = []
        let text = document.getElementById("text_tobe_searched").value.toLowerCase()
        const groups = await getDocs(collection(db, "Group"))
        let displayer = document.getElementById('displayer');
        // console.log("search_By_text running");
        displayer.innerHTML = '';
        groups.forEach((group)=> {
            let groupData = group.data();
            let description = groupData.Description;
            let group_name = groupData.Name;
            let num_of_member = groupData.NumberOfMembers;
            let size = groupData.Size;
            let not_full = num_of_member != size;
            if ((description.toLowerCase().includes(text) || group_name.toLowerCase().includes(text))&&not_full) {
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

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect {
  --ms-tag-bg: #ffde59;
  --ms-tag-color: #000000;
  --ms-ring-width: 0px;
  --ms-radius: 10px;
  --ms-dropdown-radius: 10px;
}
.dropdown_list {
            width: 400px;
            /* height: 200px; */
        }

.dropdowns_container {
    display: flex;
    justify-content: space-between;
}

.dropdown_list {
    width: calc(33.33% - 20px); /* Subtracting 20px to account for potential margins */
    margin-right: 10px; /* Add a margin to the right of each dropdown list */
}

.dropdown_list:last-child {
    margin-right: 0; /* Ensure the last dropdown doesn't have a right margin */
}

.search_bar {
    width: 1249px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid rgb(82, 77, 77);
    background: #FFF;
}
</style>