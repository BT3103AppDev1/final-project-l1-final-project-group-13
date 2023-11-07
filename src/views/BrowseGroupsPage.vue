<template>
  <div class="PageBody">
    <Sidebar />
    <SearchBar />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: "BrowseGroupsPage",
  components: {
    Sidebar,
    SearchBar,
  },
};
</script>
