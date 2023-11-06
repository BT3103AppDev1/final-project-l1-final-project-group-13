<template>
    <h1>Test</h1>
    <div id="title">
        <h1>Welcome : {{ name }}</h1>
        <img src="src/assets/logo.PNG" alt="Logo" width="300" height="300">
        <h2 id="myGroups">My Groups</h2>
    </div>
    <div id="studyGroups">
      <StudyGroupWidget/>
      <StudyGroupWidget/>
      <StudyGroupWidget/>
      <StudyGroupWidget/>
    </div>
</template>
  
  <script>
  import JoinGroup from '@/components/JoinGroup.vue'
  import StudyGroupWidget from '@/components/StudyGroupWidget.vue'
  
  console.log("in App");
  export default {
  components: { StudyGroupWidget },
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
  