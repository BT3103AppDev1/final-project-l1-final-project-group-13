<template>
    <div class="tabs">
      <router-link
        v-for="(tab, index) in tabs"
        :key="index"
        :to="tab.to"
        class="tab-button"
        :class="{ active: $route.path === tab.to }"
      >
        <span class="text">{{ tab.text }}</span>
      </router-link>
    </div>
  </template>
  
  <script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
  export default {
    name: "Tabs",
    props: {
      tabs: {
        type: Array,
        required: true,
      },
    },
    mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      }
    });
  },
  };
  </script>
  
  <style scoped>
  .tab-button {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    border-radius: 12px;
    color: black;
    font-size: 20px;
    margin: 5px 20px 5px 20px;
    border: 1px solid #ffb904;
    background-color: #ffb904;
    width: 140px;
    height: auto;
    float: left;
  }

  .tab-button:hover {
    background-color: #d9d9d982;
    border-color: #d9d9d982;
  }

  .tab-button.active {
    background-color: #d9d9d982 !important;
    color: black !important;
  }
</style>