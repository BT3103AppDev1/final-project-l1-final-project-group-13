<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification />
    </div>
    <div class="profile"> 
      <UserProfile />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import UserProfile from "@/components/UserProfile.vue";
import Notification from "@/components/Notification.vue";

export default {
  name: "UserProfilePage",
  components: {
    Sidebar,
    UserProfile,
    Notification
  },
};
</script>
<style scoped>
.container {
  display: flex;
}

.sidebar {
  position: fixed;
  top: 0;
  width: 20%;
  z-index: 1; /* Adjust the z-index value as needed */
}

.profile {
  width: 80%;
  margin-left: 20%; /* Adjust margin to accommodate the width of the sidebar */
}

.notification-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2; /* Set a higher z-index value for the notification wrapper to ensure it appears above the profile section */
}
</style>
