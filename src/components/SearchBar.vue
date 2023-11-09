<template>
  <main>
    <h1 style="text-align: left">Browse groups</h1> <br>
    <div class="search-container">
      <img
        alt="search button"
        src="@/assets/search.png"
        @click="applyFilters"
      />
      <input
        class="search_bar"
        type="text"
        id="text_tobe_searched"
        name="text_tobe_searched"
        placeholder="Search for groups"
        @keyup.enter="applyFilters"
      />
      <button class="create-group-button" @click="gotoCreateGroup()">
        Create group
      </button>
    </div>
    <br /><br />
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
        src="@/assets/filter.png"
        alt="Apply Filters"
        @click="applyFilters"
        class="clickable-image"
      />
    </div>
    <br /><br />
    <!-- if no search result, show this -->
    <div v-if="valid_groups.length === 0">
      No results found <br><br>
      <div class = "no_group_at_all"> Can't find a group? Create your personalized one now!</div>
    </div>

    <div id="displayer" class="groupss" v-if="valid_groups.length != 0">
      <div class="groupDisplay" v-for="group in valid_groups" :key="group.Name" @click="gotoVisitorPage(group.Name)">
        <strong>{{ group.Name }}</strong
        >{{ format_group_des(group.Description) }}<br />
        <div class = "members">Members:
        {{ group.NumberOfMembers }}/{{ group.Size }} </div>
      </div>
    </div>
  </main>
</template>

<script>
import { firebaseApp } from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Multiselect from "@vueform/multiselect";

const db = getFirestore(firebaseApp);

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      user: false,
      email: "",
      valid_groups: [],
      isPopupVisible: false,
      selectedGroup: {},
      selected_major: [],
      selected_course: [],
      selected_timing: [],
      selected_location: [],
      options_major: [],
      options_course: [],
      options_timing: [],
      options_location: [],
    };
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      }
    });

    // populate major list
    let docRef = doc(db, "Preference_info_instances", "Major");
    let docSnap = await getDoc(docRef);
    let data = docSnap.data();
    Object.keys(data).forEach((key) => {
      let values = data[key];
      let obj = { label: key, options: values };
      this.options_major.push(obj);
    });

    // populate course list
    docRef = doc(db, "Preference_info_instances", "Course");
    docSnap = await getDoc(docRef);
    data = docSnap.data();
    Object.keys(data).forEach((key) => {
      let values = data[key];
      let obj = { label: key, options: values };
      this.options_course.push(obj);
    });

    // populate timing list
    docRef = doc(db, "Preference_info_instances", "Timing");
    docSnap = await getDoc(docRef);
    data = docSnap.data();
    Object.keys(data).forEach((key) => {
      let values = data[key];
      let obj = { label: key, options: values };
      this.options_timing.push(obj);
    });

    // populate location list
    docRef = doc(db, "Preference_info_instances", "Location");
    docSnap = await getDoc(docRef);
    data = docSnap.data();
    Object.keys(data).forEach((key) => {
      let values = data[key];
      let obj = { label: key, options: values };
      this.options_location.push(obj);
    });
    this.applyFilters();
    // console.log("mounted running")
  },
  methods: {
    gotoCreateGroup() {
      this.$router.push("/CreateGroupPage")
    },
    async search_By_text() {
      let valid_groups = [];
      let text = document
        .getElementById("text_tobe_searched")
        .value.toLowerCase();
      const groups = await getDocs(collection(db, "Group"));
      groups.forEach((group) => {
        let groupData = group.data();
        let description = groupData.Description;
        let group_name = groupData.Name;
        let num_of_member = groupData.NumberOfMembers;
        let size = groupData.Size;
        let not_full = num_of_member != size;
        let user_not_in_group = !groupData.Members.includes(this.email)
        // console.log(user_not_in_group)
        if (
          (description.toLowerCase().includes(text) ||
            group_name.toLowerCase().includes(text)) &&
          not_full && user_not_in_group
        ) {
          valid_groups.push(groupData);
        }
      });
      return valid_groups;
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

    format_group_des(str) {
      let max_len = 93
      // Check if the string length is greater than max_len
      if (str.length > max_len) {
        // If so, slice the string to max_len - 3 and add "..."
        return str.slice(0, max_len - 3) + "...";
      } else if (str.length < max_len) {
        // If the string is shorter, add spaces until it reaches max_len
        return str.padEnd(max_len, " ");
      }
      // If the string length is equal to max_len, return it as is
  return str;
    },

    async applyFilters() {
      let inter_groups = await this.search_By_text();
      let filtered_groups = [];
      // flter by major
      if (this.selected_major.length != 0) {
        for (let group of inter_groups) {
          let group_valid = true;
          for (let member of group.Members) {
            let docRef = doc(db, "User", member);
            let docSnap = await getDoc(docRef);
            let member_data = docSnap.data();
            let major = member_data.Major;
            if (!this.hasCommonElement(this.selected_major, major)) {
              // this is not a valid group, stop checking members by breaking this loop
              group_valid = false;
              break;
            }
          }
          if (group_valid) {
            filtered_groups.push(group);
          }
        }
        inter_groups = filtered_groups;
      }
      // filter by course
      if (this.selected_course.length != 0) {
        filtered_groups = [];
        for (let group of inter_groups) {
          let group_valid = true;
          for (let member of group.Members) {
            let docRef = doc(db, "User", member);
            let docSnap = await getDoc(docRef);
            let member_data = docSnap.data();
            let courses = member_data.Courses;
            if (!this.hasCommonElement(this.selected_course, courses)) {
              // this is not a valid group, stop checking members by breaking this loop
              group_valid = false;
              break;
            }
          }
          if (group_valid) {
            filtered_groups.push(group);
          }
        }
        inter_groups = filtered_groups;
      }
      // filter by timing

      if (this.selected_timing.length != 0) {
        filtered_groups = [];
        for (let group of inter_groups) {
          let group_valid = true;
          for (let member of group.Members) {
            let docRef = doc(db, "User", member);
            let docSnap = await getDoc(docRef);
            let member_data = docSnap.data();
            let timings = member_data.Timing;
            if (!this.hasCommonElement(this.selected_timing, timings)) {
              group_valid = false;
              break;
            }
          }
          if (group_valid) {
            filtered_groups.push(group);
          }
        }
        inter_groups = filtered_groups;
      }
      // filter by location
      if (this.selected_location.length != 0) {
        filtered_groups = [];
        for (let group of inter_groups) {
          let group_valid = true;
          for (let member of group.Members) {
            let docRef = doc(db, "User", member);
            let docSnap = await getDoc(docRef);
            let member_data = docSnap.data();
            let locations = member_data.Location;
            if (!this.hasCommonElement(this.selected_location, locations)) {
              // this is not a valid group, stop checking members by breaking this loop
              group_valid = false;
              break;
            }
          }
          if (group_valid) {
            filtered_groups.push(group);
            // console.log(group.Name)
          }
        }
        inter_groups = filtered_groups;
      }

      this.valid_groups = inter_groups;
    },

    gotoVisitorPage(name) {
      if (!name) {
        console.error("Empty parameter passed for 'name'.");
        return; // Optionally, throw an error or log a warning message
      }

      this.$router.push({
        name: "VisitorStudyGroupPage",
        params: { groupName: name },
      });
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
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
  width: calc(
    33.33% - 20px
  ); /* Subtracting 20px to account for potential margins */
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
  background: #fff;
  flex-grow: 1; /* Add this line */
  width: auto; /* Change this line from a fixed width to auto */
}

.search-container img {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.create-group-button {
  background-color: #ffb904;
  border: none;
  border-radius: 10px;
  color: white;
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
  background-color: darken(#ffde59, 10%);
}

.create-group-button:before {
  content: "+";
  margin-right: 5px;
  font-size: 22px; /* Adjust to match the size in the image */
  vertical-align: middle;
  color: black;
}

.groupss {
  display: flex; /* Use flexbox to lay out children */
  flex-wrap: wrap; /* Allow children to wrap to next line */
  gap: 20px; /* Optional: adds space between children */
  justify-content: center; /* Center children horizontally in the container */
  align-items: center; /* Center children vertically in the container */
}


.groupDisplay {
  border-radius: 10px; /* Rounded corners */
  background-color: #ffde59; /* Background color */
  padding: 20px; /* Space inside the rectangle */
  margin-bottom: 10px; /* Space below the rectangle, for when they wrap */
  box-sizing: border-box; /* Include padding and border in the width and height totals */
  cursor: pointer;
  width: 300px; /* Set a specific width */
  height: 180px; /* Adjust height to auto to fit content */
  /* Remove flex properties if this is not a flex container */
  /* font-family: Inter; */

  /* Add text wrapping properties */
  word-wrap: break-word;

  display: flex;            /* Establish flex container */
  flex-direction: column;   /* Stack children vertically */
  justify-content: space-between;
}

.members {
  /* position: absolute; */
  bottom: 0;          /* Aligns the element to the bottom */
  width: 100%;  
}



.groupDisplay:hover {
  background-color: #ffca2c; /* Slightly lighter shade when hovered */
}

.no_group_at_all {
  display: inline-flex;        /* Establishes a flex container */
  flex-direction: column;/* Stacks flex items vertically */
  justify-content: center;/* Centers flex items along the main axis */
  align-items: center;  /* Centers flex items along the cross axis */
  width: auto;
  background: #FFF;
  border-radius: 20px;
  padding: 20px;       /* Add some padding */
}

.group_description {
  word-wrap: break-word;
}
</style>
