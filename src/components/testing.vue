<template>
    <div class="dropdowns_container">
    <div class="dropdown_list">
      <Multiselect
        v-model="selected_major"
        mode="tags"
        placeholder="major"
        :options="options_major"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
    </div>
    <div class="dropdown_list">
      <Multiselect
        v-model="selected_course"
        mode="tags"
        placeholder="course"
        :options="options_course"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
    </div>
    <div class="dropdown_list">
      <Multiselect
        v-model="selected_timing"
        mode="tags"
        placeholder="timing"
        :options="options_timing"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
    </div>
    <div class="dropdown_list">
      <Multiselect
        v-model="selected_location"
        mode="tags"
        placeholder="location"
        :options="options_location"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
    </div>
    <!-- create a button here to apply filter -->
    
    </div>
</template>


<style>
.multiselect {
  --ms-tag-bg: #ffde59;
  --ms-tag-color: #000000;
  --ms-ring-width: 0px;
  --ms-radius: 10px;
  --ms-dropdown-radius: 10px;
}
.dropdown_list {
            width: 400px;
            /* height: 200px; */
        }

.dropdowns_container {
    display: flex;
    justify-content: space-between;
}

.dropdown_list {
    width: calc(33.33% - 20px); /* Subtracting 20px to account for potential margins */
    margin-right: 10px; /* Add a margin to the right of each dropdown list */
}

.dropdown_list:last-child {
    margin-right: 0; /* Ensure the last dropdown doesn't have a right margin */
}
</style>