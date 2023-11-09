<template>
  <div id="group">
    <button id="studyGroup">
      <h1 id="title">Group Name</h1>
      <h4 class="description">duifhas aidahsjdbahksd asdihasdba</h4>
      <h4 class="member">
        Member: {{ groupMemberCount }} / {{ groupMemberLimit }}
      </h4>
    </button>
  </div>
</template>

<script>
console.log("in App");
export default {
  name: "TheHomePage",
  data() {
    return {
      name: "Jason",
      groupMemberLimit: 6,
      groupMemberCount: 3,
    };
  },
  methods: {
    test() {
      console.log("Hello");
    },
  },
};
</script>

<style scoped>
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
