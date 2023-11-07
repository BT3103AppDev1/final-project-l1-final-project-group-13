<template>
  <body>
    <div class="body">
      <div class="main">
        <br />
        <div class="firstcontainer">
          <h1 class="titleOfDiv">
            <span class="material-icons">lock</span>
            <br />
            <span>Enter New Password</span>
            <br />
            <p id="description">Please enter a new password for your account</p>
          </h1>
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
            <p>
              Your password must contain a minimum of 6 characters with no space
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
            <button id="submitbutton" type="button" @click="resetPassword">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import {
  getAuth,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase.js";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "EnterNewPassword",

  data() {
    return {
      email: "",
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
    resetPassword() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return false;
      }
      if (!this.password || !this.confirmPassword) {
        alert("Please fill in the required fields");
        return false;
      }

      const auth = getAuth();
      // TODO: Implement getParameterByName()
      function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null) return "";
        else return decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      // Get the action to complete.
      const mode = getParameterByName("mode");
      // Get the one-time code from the query parameter.
      const actionCode = getParameterByName("oobCode");

      verifyPasswordResetCode(auth, actionCode)
        .then((email) => {
          const accountEmail = email;
          console.log(accountEmail);

          // TODO: Show the reset screen with the user's email and ask the user for
          // the new password.
          const newPassword = this.password;

          // Save the new password.
          confirmPasswordReset(auth, actionCode, newPassword)
            .then((resp) => {
              // Password reset has been confirmed and new password updated.
              // TODO: Display a link back to the app, or sign-in the user directly
              // if the page belongs to the same domain as the app:
              // auth.signInWithEmailAndPassword(accountEmail, newPassword);
              // TODO: If a continue URL is available, display a button which on
              // click redirects the user back to the app via continueUrl with
              // additional state determined from that URL's parameters.
              this.$router.push("/resetcomplete");
            })
            .catch((error) => {
              // Error occurred during confirmation. The code might have expired or the
              // password is too weak.
              const errorCode = error.code;
              const errorMessage = error.message;
              alert("Error " + errorCode + ": " + errorMessage);
            });
        })
        .catch((error) => {
          // Invalid or expired action code. Ask user to try to reset the password
          // again.
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
  width: 800px;
  height: 580px;
  border-radius: 20px;
  background: var(--offwhite-background, #f5f5f5);
  /* margin: auto; */
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

label {
  width: 300px;
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

#description {
  color: var(--grey-helper-text, #645b5b);
  font-family: ABeeZee;
  font-size: 15px;
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

.material-icons {
  font-size: 50px;
  /* line-height: 23px; */
  color: #000000;
  /* margin-right: 1rem;
  vertical-align: bottom; */
}
</style>
