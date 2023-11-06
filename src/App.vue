<template>
  <router-link to="/">TheStudyGroupPage</router-link> <br>
  <router-link to="/TheHomePage">TheHomePage</router-link> <br>
  <router-link to="/TheCreateGroupPage">TheCreateGroupPage</router-link> <br>
  <router-view />
</template>

<script>
console.log("in App");
export default {
  name: "App",
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
