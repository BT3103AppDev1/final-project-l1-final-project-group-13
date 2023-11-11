<template>
  <main>
    <h1 id="mainHead">Profile</h1>
    <br /><br /><br />
    <p id="nav">
      <router-link style="color: #000000; text-decoration: none" to="/profile"
        >Profile</router-link
      >
      > Reset Email
    </p>
    <br /><br />
    <div class="body">
      <div class="main">
        <br />
        <div class="firstcontainer">
          <h2 class="titleOfDiv">Reset Password</h2>
          <p>Please enter a new password for your account</p>
          <br />
        </div>
        <div class="secondcontainer">
          <form id="userForm">
            <br /><br />
            <label for="password">Password: </label>
            <input
              type="password"
              id="password"
              required="yes"
              v-model="password"
            />
            <br /><br />
            <p class="requirement">
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
            <p
              class="requirement"
              v-if="passwordErrorMessage"
              style="color: red"
            >
              {{ passwordErrorMessage }}
            </p>
            <br /><br /><br /><br />
            <button id="submitbutton" type="button" @click="resetPassword">
              Reset Password
            </button>
            <br /><br /><br /><br />
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import {
  getAuth,
  updateEmail,
  onAuthStateChanged,
  updatePassword,
} from "firebase/auth";
import { getDoc, doc, updateDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "ResetEmail",

  data() {
    return {
      user: false,
      password: "",
      confirmPassword: "",
      passwordErrorMessage: "",
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
    async resetPassword() {
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

      updatePassword(this.user, this.password)
        .then(() => {
          // Update successful.
          alert("Password successfully updated!");
        })
        .catch((error) => {
          // An error ocurred
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error " + errorCode + ": " + errorMessage);
        });
    },
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;

        const docRef = await getDoc(doc(db, "User", String(user.email)));

        if (docRef.exists()) {
          let data = docRef.data();

          // HAVE NOT COMPLETED STEP 2 OF ACCOUNT CREATION
          if (!data.Major) {
            this.$router.push("/createaccount2");
          }
          // Correct page -> Populate data
          else {
            return false;
          }
        } else {
          this.$router.push("/createaccount1");
        }
      } else {
        this.$router.push("/");
      }
    });
  },
};
</script>

<style scoped>
main {
  background: var(--background-color, #f5f5f5);
  /* height: 96.6vh;
  width: 100vw; */
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

p {
  color: #000;
  text-align: left;
  font-family: ABeeZee;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-left: 45px;
}

label {
  width: 265px;
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
  padding: 0;
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

.requirement {
  color: var(--grey-helper-text, #645b5b);
  font-family: ABeeZee;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
}
</style>
