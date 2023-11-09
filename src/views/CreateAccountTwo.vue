<template>
  <body>
    <div class="body">
      <div class="main">
        <br />
        <div class="firstcontainer">
          <h1 class="titleOfDiv">
            <span class="material-icons">looks_two</span>Preferences
          </h1>
          <br /><br />
        </div>
        <div class="secondcontainer">
          <form id="userForm">
            <label for="major">Your Major: </label>
            <div class="dropdown_list">
              <Multiselect
                id="major"
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
            <br />
            <label for="courses">Your Current Courses: </label>
            <div class="dropdown_list">
              <Multiselect
                id="courses"
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

            <br />
            <label for="studyTiming">Preferred Study Timings: </label>
            <div class="dropdown_list">
              <Multiselect
                id="studyTiming"
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
            <br />
            <label for="location">Preferred Locations: </label>
            <div class="dropdown_list">
              <Multiselect
                id="location"
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
            <!-- <br /><br /><br /> -->
            <p v-if="errorMessage" style="color: red">
              {{ errorMessage }}
            </p>
            <div class="dropdown_list">
              <button id="submitbutton" type="button" @click="addDetails">
                Create Account
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { firebaseApp } from "../firebase.js";
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Multiselect from "@vueform/multiselect";
import { getDoc, doc, updateDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "CreateAccountTwo",
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
      errorMessage: "",
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
    async addDetails() {
      if (
        !this.selected_major.length ||
        !this.selected_course.length ||
        !this.selected_timing.length ||
        !this.selected_location.length
      ) {
        alert("Please fill in all required fields");
        return false;
      }
      console.log(this.user.email);
      try {
        console.log("Adding personal details");
        console.log(this.selected_course);

        const docRef = await updateDoc(
          doc(db, "User", String(this.user.email)),
          {
            Courses: this.selected_course,
            Location: this.selected_location,
            Major: this.selected_major,
            Timing: this.selected_timing,
            Groups: [],
          }
        );
        console.log(docRef);
        this.$router.push("/home");
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
        // console.log(this.user.email);

        const docRef = await getDoc(doc(db, "User", String(user.email)));

        if (docRef.exists()) {
          let data = docRef.data();

          // HAVE NOT COMPLETED STEP 2 OF ACCOUNT CREATION
          if (!data.Major) {
            return false;
          }
          // Completed account creation
          else {
            this.$router.push("/home");
          }
        } else {
          this.$router.push("/createaccount1");
        }
      } else {
        this.$router.push("/login");
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
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
body {
  background: var(
    --background-color,
    linear-gradient(
      180deg,
      #ffb904 0%,
      rgba(255, 218, 79, 0.86) 52.08%,
      rgba(255, 201, 0, 0.24) 97.4%
    )
  );
  height: 100vh;
  width: 100vw;
  position: relative;
  margin-left: 0px;
}
.body {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.main {
  width: 700px;
  /* height: 550px; */
  /* position: relative; */
  /* height: auto; */
  /* min-height: 100%; */
  /* overflow: auto; */
  border-radius: 20px;
  background: var(--offwhite-background, #f5f5f5);
  /* margin: auto; */
  position: relative;
}

h1 {
  color: #000;
  text-align: left;
  font-family: ABeeZee;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-left: 50px;
  padding-top: 10px;
}

label {
  width: 340px;
  float: left;
  text-align: right;
  padding: 8px;
  color: #5a5a5a;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1;
}

p {
  color: var(--grey-helper-text, #645b5b);
  font-family: ABeeZee;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  /* position: absolute;
  left: 35%;
  bottom: 10%; */
}

.material-icons {
  font-size: 30px;
  line-height: 23px;
  color: #000000;
  margin-right: 1rem;
  vertical-align: bottom;
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
