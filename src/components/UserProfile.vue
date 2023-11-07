<template>
  <main>
    <h1 id="mainHead">Profile</h1>
    <br /><br /><br />
    <p id="nav">
      <router-link style="color: #000000; text-decoration: none" to="/profile"
        >Profile</router-link
      >
      > User Profile
    </p>
    <br /><br />
    <div class="body">
      <div class="main">
        <br />
        <div class="firstcontainer">
          <h2 class="titleOfDiv">Personal Details</h2>
          <br /><br />
        </div>
        <div class="secondcontainer">
          <form id="userForm">
            <label for="name">Name: </label>
            <input
              type="text"
              id="name"
              required="yes"
              v-model="name"
              @input="validateFields"
              placeholder="e.g. John Doe"
            />
            <br /><br /><br />
            <label for="gender">Gender: </label>
            <select v-model="gender" id="gender" style="width: 276px">
              <option v-for="(gender, key) in options_gender" v-bind:key="key">
                {{ gender.label }}
              </option>
            </select>

            <br /><br /><br />
            <label for="dob">Date of Birth: </label>
            <input
              type="date"
              id="dob"
              required="yes"
              v-model="dob"
              @input="validateFields"
            />
            <br /><br /><br />

            <label for="telegram">Telegram Handle: </label>
            <input
              type="text"
              id="telegram"
              required="yes"
              v-model="telegram"
              @input="validateFields"
              placeholder="e.g. @johndoe"
            />
            <br /><br /><br />
            <p id="error" v-if="errorMessage" style="color: red">
              {{ errorMessage }}
            </p>
            <br /><br /><br /><br />
            <button id="submitbutton" type="button" @click="updateDetails">
              Update
            </button>
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
import { firebaseApp } from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "UserProfile",

  data() {
    return {
      user: false,
      name: "",
      gender: "",
      dob: "",
      telegram: "",
      errorMessage: "",
      options_gender: [],
    };
  },

  methods: {
    validateFields() {
      //   console.log(this.gender);
      if (!this.name || !this.dob || !this.telegram || !this.gender) {
        this.errorMessage = "Please fill in all required fields";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    async updateDetails() {
      if (!this.name || !this.dob || !this.telegram || !this.gender) {
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
            Name: this.name,
            Gender: this.gender,
            DOB: this.dob,
            TelegramHandle: this.telegram,
          }
        );
        alert("Personal details successfully updated!");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error " + errorCode + ": " + errorMessage);
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
            //get genders
            let docRef = doc(db, "Preference_info_instances", "Gender");
            let docSnap = await getDoc(docRef);
            let data = docSnap.data();
            Object.keys(data).forEach((key) => {
              let values = data[key];
              let obj = { label: key, options: values };
              //   console.log(obj);
              this.options_gender.push(obj);
              //   console.log(this.options_gender);
              //   console.log(firebase.auth().currentUser);
            });

            //get user info
            docRef = doc(db, "User", String(user.email));
            docSnap = await getDoc(docRef);
            data = docSnap.data();
            this.name = data.Name;
            this.dob = data.DOB;
            this.gender = data.Gender;
            this.telegram = data.TelegramHandle;
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
  border-radius: 12px;
  border: 1px solid #000;
  background: #fff;
  width: 220px;
  height: 55px;
  flex-shrink: 0;
  margin: 20px;
  float: left;
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
  height: 550px;
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
}
input,
select {
  border-radius: 8px;
  border: 1px solid #968888;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  float: left;
  width: 250px;
  /* height: 30px; */
  flex-shrink: 0;
  padding: 12px 12px;
  font-size: 15px;
  color: #000;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

input::placeholder {
  color: #645b5b;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  /* padding: 10px; */
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
  position: absolute;
  left: 35%;
  bottom: 10%;
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
</style>
