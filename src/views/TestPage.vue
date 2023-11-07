<template>
  <div class="PageBody">
    <Sidebar />
    <TestComponent />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import TestComponent from "@/components/TestComponent.vue";

export default {
  name: "TestPage",
  components: {
    Sidebar,
    TestComponent,
  },
};
</script>
