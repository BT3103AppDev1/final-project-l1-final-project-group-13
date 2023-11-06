<template>
     <span class="material-icons" id = "bell-icon" @click="toggleNotification">notifications</span>
   <div :class="['notification-bar', { show: showNotification }]">
    <span class="material-icons" id = "close-icon" @click="toggleNotification">close</span> <br>
  <div v-for="notification in notifications" :key="notification.id" class="notification-item">
    <h3>{{ notification.title }}</h3>
    <p>{{ notification.content }}</p>
    <span>{{ notification.time }}</span>
  </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showNotification: false,
        notifications: [
      {
        id: 1,
        title: "New Message",
        content: "You have a new message from John Doe.",
        time: "12:30 PM"
      },
      {
        id: 2,
        title: "Reminder",
        content: "Your appointment is scheduled for tomorrow.",
        time: "9:00 AM"
      },
      // Add more notification objects as needed
    ]
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
</style>