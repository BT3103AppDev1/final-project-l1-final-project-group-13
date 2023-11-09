<template>
    <div class="container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="notification-wrapper">
      <Notification />
    </div>
    <div class="PageBody">
      <SearchBar />
    </div>
</div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import SearchBar from "@/components/SearchBar.vue";
import Notification from "@/components/Notification.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "BrowseGroupsPage",
  components: {
    Sidebar,
    SearchBar,
    Notification
  },
  data() {
    return {
      user:false,
      email: "",
    }
  }
,
  mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.email = user.email
            }
        })
    }


};
</script>

<style scoped>
.PageBody {
  display: flex;
  width: 100%; /* Set width to 100% to occupy the remaining space */
}

.container {
  display: flex;
  position: relative; /* Set the position to relative to establish a new containing block for the sticky element */
}

.sidebar {
  position: sticky;
  top: 0; /* Set the top to 0 to keep the sidebar at the top of the screen */
  height: 100vh; /* Set the height to 100vh for the sidebar to occupy the entire height of the viewport */
}

.notification-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2; /* Set a higher z-index value for the notification wrapper to ensure it appears above the profile section */
}

.PageBody {
  flex: 1; /* Set flex to 1 to make it occupy the remaining space */
}
</style>
