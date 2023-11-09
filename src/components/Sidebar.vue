<template>
  <aside>
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
    <div class="menu">
      <router-link class="button" to="/home">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link class="button" to="/browsegroups">
        <span class="material-icons">hive</span>
        <span class="text">Browse Groups</span>
      </router-link>
      <router-link class="button" to="/profile">
        <span class="material-icons">person</span>
        <span class="text">Profile</span>
      </router-link>
      <router-link class="button" to="/faq">
        <span class="material-icons">help</span>
        <span class="text">FAQ</span>
      </router-link>
    </div>
    <div class="flex"></div>
    <div class="menu">
      <div class="button" @click="signout">
        <span class="material-icons">logout</span>
        <span class="text">Log out</span>
      </div>
    </div>
  </aside>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Sidebar",

  methods: {
    signout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$router.push("/");
        })
        .catch((error) => {
          // An error happened.
          console.log("Sign out failed!");
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error " + errorCode + ": " + errorMessage);
        });
    },
  },
};
</script>

<style scoped>
aside {
  width: 180px;
  min-width: 180px;

  background: var(
    --background-color,
    linear-gradient(
      180deg,
      #ffb904 0%,
      rgba(255, 218, 79, 0.86) 52.08%,
      rgba(255, 201, 0, 0.24) 97.4%
    )
  );
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1rem;
  transition: 0.2s ease-out;
}

.logo {
  margin-bottom: 1rem;
}

img {
  width: 130px;
}

.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: left;
}

.button:hover {
  background-color: #d9d9d982;
}

.material-icons {
  font-size: 2rem;
  color: #000000;
  margin-right: 1rem;
}

.text {
  color: #000000;
}

.menu {
  margin: 0 -1rem;
}

.router-link-exact-active {
  background-color: #d9d9d982;
}

/* .flex {
  flex: 1 1 0;
} */
</style>
