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
  width: 80%;
}

.container {
  display: flex;
}

main {
  height: 100vh;
  width: 100vw;
}

/* .profile {
  width: 100%;
} */
.notification-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2; /* Set a higher z-index value for the notification wrapper to ensure it appears above the profile section */
}

</style>
