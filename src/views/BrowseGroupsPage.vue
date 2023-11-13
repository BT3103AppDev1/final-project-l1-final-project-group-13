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
h1, h2, h3, h4, h5, h6, p {
  color: #000;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
}
.PageBody {
  display: flex;
  width: 100%; 
}

.container {
  display: flex;
  position: relative;
}

.sidebar {
  position: sticky;
  top: 0; 
  height: 100vh; 
}

.notification-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3; 
}

.PageBody {
  flex: 1; 
}
</style>
