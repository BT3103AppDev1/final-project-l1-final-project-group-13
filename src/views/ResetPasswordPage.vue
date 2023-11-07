<template>
  <div class="PageBody">
    <Sidebar />
    <ResetPassword />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import ResetPassword from "@/components/ResetPassword.vue";

export default {
  name: "ResetPasswordPage",
  components: {
    Sidebar,
    ResetPassword,
  },
};
</script>
