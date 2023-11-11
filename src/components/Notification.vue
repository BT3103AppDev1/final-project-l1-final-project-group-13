<template>
  <div class="notification-container">
    <span
      class="material-icons"
      id="bell-icon"
      @click="toggleNotification"
      >notifications</span
    >
    <div :class="['notification-bar', { show: showNotification }]">
      <div id="header" class="header-container">
        <h3 class="notification-header">Notifications</h3>
        <span
          class="material-icons"
          id="close-icon"
          @click="toggleNotification"
          >close</span
        >
        <br />
      </div>
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-item"
      >
        <div id="info">
          <span class="material-symbols-outlined" id="info-icon">info</span>
        </div>
        <div id="noti">
          <h5>{{ notification.title }}</h5>
          <h6>{{ notification.time }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../firebase.js";
import {
  getDoc,
  getFirestore,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.fetchNotifications();
      }
    });
  },
  watch: {
    refreshComp: {
      immediate: true,
      handler() {
        this.fetchNotifications();
      },
    },
  },

  data() {
    return {
      showNotification: false,
      notifications: [],
      user: false,
      email: "",
    };
  },

  methods: {
    async fetchNotifications() {
      if (this.email) {
        const userDoc = await getDoc(doc(db, "User", this.email));
        this.notifications = userDoc.data().Notifications.sort((a, b) => {
          const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        if (timeB > timeA) return 1;
        if (timeA >= timeB) return -1;
        return 0;
      });
      }
    },

    toggleNotification() {
      this.showNotification = !this.showNotification;
    },
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
.notification-container {
  position: relative;
  display: flex;
  z-index: 999; /* Set a high z-index value to ensure the notification bar appears in front of the page content */
}

.notification-bar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px; /* Adjust the width as needed */
  background-color: #f1f1f1;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  z-index: 1000; /* Set a z-index higher than the page content */
}
#bell-icon {
  font-size: 2rem;
  color: #000000;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

#info-icon {
  font-size: 2rem;
  color: #000000;
}
.header-container {
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
}

.notification-header {
  margin-left: 20px;
  float: left;
  margin-top: 10px;
}

#close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
.notification-bar.show {
  transform: translateX(0);
}

.notification-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}

#info {
  height: 60px;
  width: 40px;
  float: left;
  margin-right: 20px;
  margin-top: 10px;
}

#noti {
  text-align: left;
}
</style>
