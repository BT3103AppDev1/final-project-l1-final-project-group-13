<template>
  <aside>
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
    <div class="menu">
      <router-link class="button" to="/">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link class="button" to="/about">
        <span class="material-icons">hive</span>
        <span class="text">Browse Groups</span>
      </router-link>
      <router-link class="button" to="/about">
        <span class="material-icons">person</span>
        <span class="text">Profile</span>
      </router-link>
      <router-link class="button" to="/about">
        <span class="material-icons">help</span>
        <span class="text">FAQ</span>
      </router-link>
    </div>
    <div class="flex"></div>
    <div class="menu">
      <router-link class="button" to="/about">
        <span class="material-icons">logout</span>
        <span class="text">Log out</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style>
aside {
  width: 180px;

  background-image: linear-gradient(#ffb904, #ffda4f);
  height: 100vh;

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
  width: 100px;
}

.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
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

.flex {
  flex: 1 1 0;
}
</style>
