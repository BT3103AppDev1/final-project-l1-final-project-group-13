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
  height: auto;
}

main {
  flex: 1 1 0;
  padding: 2rem;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: var(--background-color, #f5f5f5);
}

.PageBody {
  display: flex;
}
</style>
