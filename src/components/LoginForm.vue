<template>
  <div class="main">
    <br />
    <div class="firstcontainer">
      <h1 class="titleOfDiv">
        Welcome back to<br />
        <span id="StudyText">Study</span>
        <span id="HiveText">Hive</span>
      </h1>
    </div>
    <div class="secondcontainer">
      <form id="userForm">
        <br />
        <input
          type="text"
          id="email"
          required="yes"
          placeholder="Email"
          v-model="email"
        />
        <br /><br />
        <input
          type="password"
          id="password"
          required="yes"
          placeholder="Password"
          v-model="password"
        />
        <br /><br />
        <router-link
          class="text"
          style="color: var(--standard-yellow, #ffb904)"
          to="/forgotpassword"
          >Forgot Password?</router-link
        >
        <br /><br /><br /><br />
        <button id="submitbutton" type="button" @click="login">Login</button>
        <br /><br />
        <p class="text">
          Don't have an account?
          <router-link
            style="color: var(--standard-yellow, #ffb904)"
            to="/signup"
            >Sign Up</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    testAlert() {
      alert("test is working");
    },
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.$router.push("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error " + errorCode + ": " + errorMessage);
        });
    },
  },

  // mounted() {
  //   var ui = firebaseui.auth.AuthUI.getInstance();
  //   if (!ui) {
  //     ui = new firebaseui.auth.AuthUI(firebase.auth());
  //   }

  //   var uiConfig = {
  //     signInSuccessUrl: "about",
  //     signInOptions: [
  //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //       firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //     ],
  //   };
  //   ui.start("#firebaseui-auth-container", uiConfig);
  // },
};
</script>

<style scoped>
.main {
  width: 500px;
  height: 500px;
  border-radius: 20px;
  background: var(--offwhite-background, #f5f5f5);
  /* margin: auto; */
  position: relative;
  margin: auto;
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
  line-height: 44px; /* 73.333% */
}
#HiveText {
  color: var(--standard-yellow, #ffb904);
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: 44px;
}
input {
  border-radius: 8px;
  border: 1px solid #968888;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  /* float: left; */
  width: 300px;
  /* height: 30px; */
  flex-shrink: 0;
  padding: 12px 12px;
  font-size: 15px;
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
  left: 25%;
  bottom: 20%;
}

.linktext {
  color: var(--standard-yellow, #ffb904);
  font-family: ABeeZee;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  left: 18%;
}

.text {
  color: #000000;
  font-family: ABeeZee;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  left: 18%;
}
</style>
