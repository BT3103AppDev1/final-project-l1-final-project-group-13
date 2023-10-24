<template>
    <div id="group">
        <h1>Group Name</h1>
    </div>
</template>
  
  <script>
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
  