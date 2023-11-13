<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification />
    </div>
    <div class="profile">
      <Preferences />
    </div>
  </div>

</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Preferences from "@/components/Preferences.vue";
import Notification from "@/components/Notification.vue";

export default {
  name: "PreferencesPage",
  components: {
    Sidebar,
    Preferences,
    Notification
  },
};
</script>

<style scoped>
.container {
  display: flex;
  position: relative;
  overflow-x: auto;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 1; 
  overflow-x: auto;
}

.notification-wrapper {
  position: absolute;
  top: 10px; 
  right: 10px; 
  z-index: 3;
}

.profile {
  display: flex;
  width: 100%;
  flex: 1;
  overflow-x: auto;
}

</style>