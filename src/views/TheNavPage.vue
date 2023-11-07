<template>
    <button id="toHomePage" @click="toHomePage">Home Page</button>
    <button id="toAboutPage" @click="toAboutPage">About Page</button>
    <button id="toStudyGroupPage" @click="toStudyGroupPage">Home Page</button>
    <!-- <button id="toHomePage" >Home Page</button>
    <button id="toAboutPage" >About Page</button>
    <button id="toStudyGroupPage">Home Page</button> -->
</template>
  
  <script>
  import About from '@/views/About.vue'
  import TheHomePage from '@/views/TheHomePage.vue'
  import TheStudyGroupPage from '@/views/TheStudyGroupPage.vue'
  
  console.log("in App");
  export default {
    name: "TheNavPage",
    methods: {
      test() {
        console.log('Hello');
      },
      toHomePage() {
        console.log('Homepage')
      },
      toAboutPage() {
        console.log('Aboutpage')
      },
      toStudyGroupPage() {
        console.log('Studygrouppage')
      },
    }
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #0f56c7;
  }
  </style>
  