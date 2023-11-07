<template>
  <main><h1 style="text-align: left;">Browse groups</h1>
    <div class="search-container">
      <img alt="search button" src="@/components/search.png" @click="search_By_text"/>
    <input class="search_bar" 
           type="text" 
           id="text_tobe_searched" 
           name="text_tobe_searched"
           placeholder="Search for groups"
           @keyup.enter="search_By_text">
    <button class="create-group-button" @click="createGroup">Create group</button>

</div>
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
    <!-- create a button here to apply filter -->
    <img
        src="@/components/filter.png" 
        alt="Apply Filters" 
        @click="applyFilters"
        class="clickable-image"
      />
    </div>
    <br><br>
    <div id = "displayer" class="groupss">
      <!-- <div class="groupDisplay" v-for="group in valid_groups" :key="group.Name">
        <strong>{{ group.Name }}</strong><br>{{ group.Description }}<br>Members: {{ group.NumberOfMembers }}/{{ group.Size }}
      </div> -->
    </div>
    <!-- <div v-if="isPopupVisible" class="overlay" @click="closePopup"></div>
    <div v-if="isPopupVisible" class="popup">
      <p>{{ selectedGroup.Name }}</p>
      <button @click="closePopup">Close</button>
    </div> --></main>
  


</template>




<script>
import firebaseApp from '../firebase.js'
import {getFirestore} from "firebase/firestore"
import {getDoc,doc, setDoc, updateDoc, arrayUnion, getDocs,collection} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Multiselect from '@vueform/multiselect'

const db = getFirestore(firebaseApp);

export default {
    components: {
        Multiselect,

  },
    data() { 
    return { 
        user: false,
        useremail: '',
        valid_groups:[],
        isPopupVisible: false,
        selectedGroup: {},
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
    // openPopup(group) {
    //   this.selectedGroup = group; // Store the clicked group's data
    //   this.isPopupVisible = true; // Show the popup
    // },

    closePopup() {
      this.isPopupVisible = false; // Hide the popup
    },

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
                // console.log("Displaying: " + group_name)
                let newDiv = document.createElement('div');
                newDiv.id = group_name;
                newDiv.innerHTML = 
                `<strong>${group_name}</strong><br>${description}<br>Members: ${num_of_member}/${size}`;
                newDiv.className = 'groupDisplay';
                newDiv.addEventListener('click', function() {
                  this.selectedGroup = groupData; // Store the clicked group's data
                  this.isPopupVisible = true; // Show the popup
                  // console.log('Group clicked: ' + group_name + this.isPopupVisible);
                  // console.log(this.selectedGroup.Name);

            });
                displayer.appendChild(newDiv);
            }
            
        })

        this.valid_groups = valid_groups;
        console.log(this.valid_groups[0])
    },

    hasCommonElement(array1, array2) {
      let set1 = new Set(array1);
      for (let element of array2) {
        if (set1.has(element)) {
          return true;
        }
      }
      return false;
},

    async applyFilters() {
      let filtered_groups = []
      // first of all, filter all group by a single filter (eg:major)
      for(let group of this.valid_groups) {
        let group_valid = true;
        for (let member of group.Members) {
          let docRef = doc(db, "User", member);
          let docSnap = await getDoc(docRef);
          let member_data = docSnap.data();
          let major = member_data.Major;
          if (!this.hasCommonElement(this.selected_major, major)) {
           // this is not a valid group, stop checking members by breaking this loop
           group_valid = false;
           break
          }
        }
        if (group_valid) {
          filtered_groups.push(group)
        }
      }
      
      this.valid_groups = filtered_groups
      console.log(filtered_groups)

    }
}
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
main {
  background: var(--background-color, #f5f5f5);
  height: 96.6vh;
  width: 100vw;
  position: relative;
}

body {
  background-color: #F5F5F5; /* Light grey background */
}

.multiselect {
  --ms-tag-bg: #ffde59;
  --ms-tag-color: #000000;
  --ms-ring-width: 0px;
  --ms-radius: 10px;
  --ms-dropdown-radius: 10px;
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

.clickable-image {
  height: 40px;
  width: 40px;
  cursor: pointer; /* Makes the cursor indicate clickable */
  align-self: center; /* Aligns the image vertically inside the flex container */
  margin-left: auto; /* Pushes the image to the right */
}

.search-container {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
}

.search_bar {
  height: 40px;
  padding-left: 50px;
  padding-right: 10px; 
  font-size: 16px;
  width: 200px; /* or any desired width */
  border-radius: 10px;
  border: 1px solid rgb(82, 77, 77);
  background: #FFF;
  flex-grow: 1; /* Add this line */
  width: auto; /* Change this line from a fixed width to auto */
}

.search-container img {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
    width: 20px;
    cursor: pointer;
}

.create-group-button {
  background-color: #FFB904;
  border: none;
  border-radius: 10px;
  color: #000000;
  padding: 8px 16px; /* Adjust padding to match the button height with the input field */
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-weight: bold;
  white-space: nowrap;
  transition: background-color 0.3s ease;
}

.create-group-button:hover {
  background-color: darken(#FFDE59, 10%);
}

.create-group-button:before {
  content: '+';
  margin-right: 5px;
  font-size: 20px; /* Adjust to match the size in the image */
  vertical-align: middle;
}


.groupss {
  display: flex; /* Use flexbox to lay out children */
  flex-wrap: wrap; /* Allow children to wrap to next line */
  gap: 10px; /* Optional: adds space between children */
  justify-content: center; /* Center children horizontally in the container */
  align-items: center; /* Center children vertically in the container */
}


.groupDisplay {
  border-radius: 10px; /* Rounded corners */
  background-color: #FFDE59; /* Background color */
  padding: 20px; /* Space inside the rectangle */
  margin-bottom: 10px; /* Space below the rectangle, for when they wrap */
  box-sizing: border-box; /* Include padding and border in the width and height totals */
  flex: 0 1 auto; /* Don't grow, but allow to shrink and keep their auto base size */
  cursor: pointer;
  width: 300px; /* You can set a specific width or use a percentage */
  height: auto; /* Height will be determined by the content size */
  /* font-family: Inter; */
}


.groupDisplay:hover {
  background-color: #ffca2c; /* Slightly lighter shade when hovered */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  z-index: 10; /* Ensure it's above other content */
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  z-index: 20; /* Ensure the popup is above the overlay */
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}
</style>