<template>
     <span class="material-icons" id = "bell-icon" @click="toggleNotification">notifications</span>
   <div :class="['notification-bar', { show: showNotification }]">
    <div id="header" class="header-container">
  <h3 class="notification-header">Notifications</h3>
    <span class="material-icons" id = "close-icon" @click="toggleNotification">close</span> <br>
    </div>
  <div v-for="notification in notifications" :key="notification.id" class="notification-item">
    <div id = "info">
    <span class="material-symbols-outlined" id = "info-icon">info</span>
    </div>
    <div id = "noti">
    <h5>{{ notification.title }}</h5>
    <h6>{{ notification.time }}</h6>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
import {firebaseApp} from "../firebase.js";
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
        this.email = user.email
        this.notifications = (await getDoc(doc(db, "User", this.email))).data().Notifications.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
      }
    })
},

    data() {
      return {
        showNotification: false,
        notifications: [],
        user: false,
        email: ""
      };
    },

    methods: {
      toggleNotification() {
        this.showNotification = !this.showNotification;
      }
    }
  };
  </script>


<style scoped>
.notification-container {
  position: relative;
  display: flex;
}

.notification-bar {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px; /* Adjust the width as needed */
  background-color: #f1f1f1;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
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
  width:40px;
  float:left;
  margin-right: 20px;
  margin-top: 10px;
}

#noti {
  text-align: left;
}
</style>

