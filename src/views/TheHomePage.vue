<template>
    <h1>Test</h1>
    <div id="title">
        <h1>Welcome : {{ name }}</h1>
        <img src="src/assets/logo.PNG" alt="Logo" width="300" height="300">
    </div>

</template>
  
  <script>
  import JoinGroup from '@/components/JoinGroup.vue'
  
  console.log("in App");
  export default {
    name: "TheHomePage",
    data() {
      return {
        name : 'Jason',
        memberLimit : 6,
      }
    },
    methods: {
      test() {
        console.log('Hello');
      }
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
  