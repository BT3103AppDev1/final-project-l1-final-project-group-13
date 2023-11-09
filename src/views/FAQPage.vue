<template>
    <div class="PageBody">
      <Sidebar />
      <FAQ />
    </div>
  </template>
  
  <script>
  import Sidebar from "@/components/Sidebar.vue";
  import FAQ from '@/components/FAQ.vue'
  
  export default {
    name: "FAQPage",
    components: {
      Sidebar,
      FAQ,
    },
  };
  </script>

<style scoped>
.PageBody {
  display: flex;
}

main {
  height: auto;
}
</style>