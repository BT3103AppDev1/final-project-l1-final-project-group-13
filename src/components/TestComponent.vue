<template>
  <main id="TestComponent">
    <h1 id="mainHead">Test Page</h1>
    <div id="pagecontent">
      Celine is testing her navigation bar.
      <br />
      She is still testing her navigation bar.
    </div>
  </main>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "TestComponent",
  components: {
    Sidebar,
  },
};
</script>

<style></style>
