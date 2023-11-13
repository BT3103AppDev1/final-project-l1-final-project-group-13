<template>
  <body>
    <div class="body">
      <div class="main">
        <br /><br />
        <div class="firstcontainer">
          <h1 class="titleOfDiv">
            Sign up with<br />
            <span id="StudyText">Study</span>
            <span id="HiveText">Hive</span>
          </h1>
          <br /><br />
        </div>
        <div class="secondcontainer">
          <form id="userForm">
            <label for="email">Email: </label>
            <input
              type="text"
              id="email"
              required="yes"
              placeholder="e.g. johndoe@gmail.com"
              v-model="email"
            />
            <br /><br /><br />
            <label for="password">Password: </label>
            <input
              type="password"
              id="password"
              required="yes"
              v-model="password"
            />
            <br /><br />
            <p>
              Your password must contain a minimum of 8 characters with no space
              <br />with at least 1 uppercase letter, 1 lowercase letter, and 1
              number
            </p>
            <br />

            <label for="confirmpassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmpassword"
              required="yes"
              v-model="confirmPassword"
              @input="validateForm"
            />
            <br /><br />
            <p v-if="passwordErrorMessage" style="color: red">
              {{ passwordErrorMessage }}
            </p>
            <br /><br /><br /><br />
            <button id="submitbutton" type="button" @click="register">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "RegistrationForm",

  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      passwordErrorMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    validateForm() {
      if (this.password !== this.confirmPassword) {
        this.passwordErrorMessage = "Passwords do not match";
        return false;
      }
      this.passwordErrorMessage = "";
      return true;
    },
    register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return false;
      }
      if (!this.password || !this.confirmPassword) {
        alert("Please fill in the required fields");
        return false;
      }

      if (this.password.length < 8) {
        alert("Error: Password must be at least 8 characters");
        return false;
      } else if (this.password.search(/[a-z]/) < 0) {
        alert("Error: Password must contain at least one lowercase letter");
        return false;
      } else if (this.password.search(/[A-Z]/) < 0) {
        alert("Error: Password must contain at least one uppercase letter");
        return false;
      } else if (this.password.search(/[0-9]/) < 0) {
        alert("Error: Password must contain at least one number");
        return false;
      }

      const auth = getAuth();
      console.log("Registering...");
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          this.$router.push("/createaccount1");
          console.log("Registered successfully");
        })
        .catch((error) => {
          console.log("Register failed!");
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error " + errorCode + ": " + errorMessage);
        });
    },
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      //already logged in
      if (user) {
        this.user = user;
        console.log(user.email);

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
          this.$router.push("/createaccount1");
        }
        // not logged in
      } else {
        return false;
      }
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
  position: relative;
}

h1 {
  color: #000;
  text-align: center;
  font-family: ABeeZee;
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

#StudyText {
  color: #000;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 44px; 
}

#HiveText {
  color: var(--standard-yellow, #ffb904);
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 44px;
}

label {
  width: 260px;
  float: left;
  text-align: right;
  padding: 8px;
  color: #5a5a5a;
  font-size: 20px;
}

input {
  border-radius: 8px;
  border: 1px solid #968888;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  float: left;
  width: 250px;
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
</style>
