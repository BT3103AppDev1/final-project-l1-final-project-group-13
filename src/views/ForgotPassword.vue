<template>
  <body>
    <div class="body">
      <div class="main">
        <br />
        <div class="firstcontainer">
          <h1 class="titleOfDiv">
            <span class="material-icons">lock</span>
            <br />
            <span>Forgot your Password?</span>
            <br />
            <p id="description">
              Please enter your registered email with StudyHive
            </p>
          </h1>
        </div>
        <div class="secondcontainer">
          <form id="userForm">
            <br /><br />
            <label for="email">Email: </label>
            <input
              type="text"
              id="email"
              required="yes"
              placeholder="e.g. johndoe@gmail.com"
              v-model="email"
            />
            <br /><br /><br /><br /><br /><br />
            <button id="submitbutton" type="button" @click="sendLink">
              Send Instructions
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
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "ForgotPassword",

  data() {
    return {
      email: "",
    };
  },
  methods: {
    sendLink() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          this.$router.push("/emailsent");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error);
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
  width: 650px;
  height: 450px;
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

label {
  width: 200px;
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
}

.material-icons {
  font-size: 50px;
  color: #000000;
}
</style>
