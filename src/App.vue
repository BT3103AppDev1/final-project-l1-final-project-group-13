<template>
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
  font-family: ABeeZee;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  width: 100vw;
  height: 100vh;
  margin-top: -8px;
  margin-left: -8px;
  margin-bottom: -8px;
}

main {
  flex: 1 1 0;
  padding: 2rem;

  /* @media (max-width: 768px) {
    margin-left: -1000px;
    position: fixed;
  } */
}

.PageBody {
  display: flex;
}
</style>
