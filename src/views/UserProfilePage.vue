<template>
  <div class="PageBody">
    <Sidebar />
    <UserProfile />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import UserProfile from "@/components/UserProfile.vue";

export default {
  name: "UserProfilePage",
  components: {
    Sidebar,
    UserProfile,
  },
};
</script>
