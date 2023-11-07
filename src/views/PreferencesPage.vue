<template>
  <div class="PageBody">
    <Sidebar />
    <Preferences />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Preferences from "@/components/Preferences.vue";

export default {
  name: "PreferencesPage",
  components: {
    Sidebar,
    Preferences,
  },
};
</script>
