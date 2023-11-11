<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification />
    </div>
    <div class="profile">
      <ProfileComponent />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
import Notification from "@/components/Notification.vue";

export default {
  name: "Profile",
  components: {
    Sidebar,
    ProfileComponent,
    Notification,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  position: relative;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 1; /* Adjust the z-index as needed */
}

.notification-wrapper {
  position: absolute;
  top: 10px; /* Adjust the top position as needed */
  right: 10px; /* Adjust the right position as needed */
  z-index: 3;
}

.profile {
  display: flex;
  width: 100%;
  flex: 1;
}

</style>
