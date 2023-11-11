<template>
  <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification />
    </div>
    <div class="PageBody">
      <FAQ />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import FAQ from "@/components/FAQ.vue";
import Notification from "@/components/Notification.vue";

export default {
  name: "FAQPage",
  components: {
    Sidebar,
    FAQ,
    Notification,
  },
};
</script>

<style scoped>
h1, h2, h3, h4, h5, h6, p {
  color: #000;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
}
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

.PageBody {
  display: flex;
  width: 100%;
  flex: 1;
}
</style>