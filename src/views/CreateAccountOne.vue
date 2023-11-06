<template>
  <body>
    <div class="body">
      <div class="main">
        <br />
        <div class="firstcontainer">
          <h1 class="titleOfDiv">
            <span class="material-icons">looks_one</span>Personal Details
          </h1>
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
            <!-- <Vueform
              ><SelectElement
                id="name"
                required="yes"
                v-model="gender"
                :native="false"
                :items="options_gender"
                :searchable="true"
                @input="validateFields"
            /></Vueform> -->
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
            <p v-if="errorMessage" style="color: red">
              {{ errorMessage }}
            </p>
            <br /><br /><br /><br />
            <button id="submitbutton" type="button" @click="addDetails">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import firebase from "@/uifire.js";
import firebaseApp from "../firebase.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Vueform, useVueform } from "@vueform/vueform";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "CreateAccountOne",
  components: {
    Vueform,
    useVueform,
  },
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
      if (!this.name || !this.dob || !this.telegram) {
        this.errorMessage = "Please fill in all required fields";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    async addDetails() {
      //   const auth = getAuth();
      //   console.log("Registering...");
      //   createUserWithEmailAndPassword(auth, this.email, this.password)
      //     .then((userCredential) => {
      //       const user = userCredential.user;
      //       this.$router.push("/home");
      //       console.log("Registered successfully");
      //     })
      //     .catch((error) => {
      //       console.log("Register failed!");
      //       const errorCode = error.code;
      //       const errorMessage = error.message;
      //       alert("Error " + errorCode + ": " + errorMessage);
      //     });
      if (!this.name || !this.dob || !this.telegram) {
        alert("Please fill in all required fields");
        return false;
      }

      console.log(this.user.email);
      try {
        console.log("Adding personal details");

        const docRef = await setDoc(doc(db, "User", String(this.user.email)), {
          Name: this.name,
          DOB: this.dob,
          Gender: this.gender,
          TelegramHandle: this.telegram,
        });
        console.log(docRef);
        this.$router.push("/createaccount2");
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
            this.$router.push("/createaccount2");
          }
          // Completed account creation
          else {
            this.$router.push("/home");
          }
        } else {
          return false;
        }
      } else {
        this.$router.push("/login");
      }
    });

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
  },
};
</script>

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
  height: 550px;
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
  width: 260px;
  float: left;
  text-align: right;
  padding: 8px;
  color: #5a5a5a;
  font-size: 20px;
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
  position: absolute;
  left: 35%;
  bottom: 10%;
}

.material-icons {
  font-size: 30px;
  line-height: 23px;
  color: #000000;
  margin-right: 1rem;
  vertical-align: bottom;
}
</style>
