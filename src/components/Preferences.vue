<template>
  <main>
    <h1 id="mainHead">Profile</h1>
    <br /><br /><br />
    <p id="nav">
      <router-link style="color: #000000; text-decoration: none" to="/profile"
        >Profile</router-link
      >
      > Preferences
    </p>
    <br /><br />
    <div class="body">
      <div class="main">
        <br />
        <div class="firstcontainer">
          <h2 class="titleOfDiv">Study Preferences</h2>
          <br /><br />
        </div>
        <div class="secondcontainer">
          <form id="userForm">
            <label for="major">Your Major: </label>
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
                @input="validateFields"
              />
            </div>
            <br />
            <label for="courses">Your Current Courses: </label>
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
                @input="validateFields"
              />
            </div>

            <br />
            <label for="studyTiming">Preferred Study Timings: </label>
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
                @input="validateFields"
              />
            </div>
            <br />
            <label for="location">Preferred Locations: </label>
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
                @input="validateFields"
              />
            </div>
            <!-- <br /><br /><br /> -->

            <div class="dropdown_list">
              <button id="submitbutton" type="button" @click="updateDetails">
                Update
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, updateDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";
import Multiselect from "@vueform/multiselect";

const db = getFirestore(firebaseApp);

export default {
  name: "Preferences",
  components: {
    Multiselect,
  },

  data() {
    return {
      user: false,
      selected_major: [],
      selected_course: [],
      selected_timing: [],
      selected_location: [],
      options_major: [],
      options_course: [],
      options_timing: [],
      options_location: [],
      errorMessage: "TESTING",
    };
  },

  methods: {
    validateFields() {
      //   console.log(this.gender);
      if (
        !this.selected_major.length ||
        !this.selected_course.length ||
        !this.selected_timing.length ||
        !this.selected_location.length
      ) {
        this.errorMessage = "Please fill in all required fields";
        return false;
      }
      this.errorMessage = "";
      return true;
    },

    async updateDetails() {
      if (
        !this.selected_major.length ||
        !this.selected_course.length ||
        !this.selected_timing.length ||
        !this.selected_location.length
      ) {
        console.log("Not all fields populated");
        alert("Please fill in all required fields");
        return false;
      }
      try {
        console.log("Adding personal details");
        console.log(this.user.email);
        const docRef = await updateDoc(
          doc(db, "User", String(this.user.email)),
          {
            Major: this.selected_major,
            Courses: this.selected_course,
            Timing: this.selected_timing,
            Location: this.selected_location,
          }
        );
        alert("Personal details successfully updated!");
      } catch (error) {
        alert("Error adding document: ", error);
      }
    },
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;

        const docRef = await getDoc(doc(db, "User", String(user.email)));

        if (docRef.exists()) {
          let data = docRef.data();

          // HAVE NOT COMPLETED STEP 2 OF ACCOUNT CREATION
          if (!data.Major) {
            this.$router.push("/createaccount2");
          }
          // Correct page -> Populate data
          else {
            // populate major list
            let docRef = doc(db, "Preference_info_instances", "Major");
            let docSnap = await getDoc(docRef);
            let data = docSnap.data();
            Object.keys(data).forEach((key) => {
              let values = data[key];
              let obj = { label: key, options: values };
              this.options_major.push(obj);
            });
            console.log(this.options_major);

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

            //get user info
            docRef = doc(db, "User", String(user.email));
            docSnap = await getDoc(docRef);
            data = docSnap.data();
            this.selected_course = data.Courses;
            this.selected_location = data.Location;
            this.selected_major = data.Major;
            this.selected_timing = data.Timing;
          }
        } else {
          this.$router.push("/createaccount1");
        }
      } else {
        this.$router.push("/login");
      }
    });
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
main {
  background: var(--background-color, #f5f5f5);
  height: 96.6vh;
  width: 100vw;
  position: relative;
}

/* .body {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
} */

h1 {
  color: #000;
  font-family: ABeeZee;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  float: left;
  margin: 0px;
}

.pageTitle {
  color: #000;
  font-family: ABeeZee;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.description {
  color: #000;
  font-family: ABeeZee;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.text {
  float: left;
  text-align: left;
  margin-left: 45px;
}

button {
  width: 250px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--standard-yellow, #ffb904);
  background: var(--standard-yellow, #ffb904);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  text-align: center;
  font-family: ABeeZee;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 30px;
}

#pagecontent {
  width: 700px;
  height: 550px;
  border-radius: 20px;
  background: white;
  /* margin: auto; */
  position: relative;
}

.main {
  width: 700px;
  /* height: 550px; */
  border-radius: 20px;
  background: white;
  /* margin: auto; */
  position: relative;
}

h2 {
  color: #000;
  text-align: left;
  font-family: ABeeZee;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-left: 45px;
  /* padding-top: 10px; */
}

label {
  width: 260px;
  float: left;
  text-align: right;
  padding: 8px;
  color: #5a5a5a;
  font-size: 18px;
  margin-top: 10px;
}

#nav {
  color: #000;
  font-family: ABeeZee;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  float: left;
  margin: 0px;
}

#error {
  color: red;
  font-family: ABeeZee;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
}

.multiselect {
  --ms-tag-bg: #ffde59;
  --ms-tag-color: #000000;
  --ms-ring-width: 0px;
  --ms-radius: 10px;
  --ms-dropdown-radius: 10px;
  border-radius: 8px;
  border: 1px solid #968888;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  float: left;
  width: 250px;
  font-size: 15px;
  color: #000;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  /* height: 30px; */
  margin-top: 10px;
  margin-bottom: 10px;
  /* overflow: auto; */
}

.dropdown_list:last-child {
  margin-right: 0; /* Ensure the last dropdown doesn't have a right margin */
}
</style>
