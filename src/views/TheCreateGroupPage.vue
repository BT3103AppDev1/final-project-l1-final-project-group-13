<template>
  <div class="PageBody">
    <Sidebar />
    <CreateGroupComponent />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import CreateGroupComponent from "@/components/CreateGroupComponent.vue";

export default {
  name: "TheCreateGroupPage",
  components: {
    Sidebar,
    CreateGroupComponent,
  },
};
</script>
