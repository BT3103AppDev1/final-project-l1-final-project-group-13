<template>
  <div class="PageBody">
    <Sidebar />
    <ProfileComponent />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
  name: "Profile",
  components: {
    Sidebar,
    ProfileComponent,
  },
};
</script>
