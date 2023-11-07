<template>
      <div id = "displayer" class="groupss" v-if="valid_groups.length != 0">
      <div class="groupDisplay" v-for="group in valid_groups" :key="group.Name">
        <strong>{{ group.Name }}</strong><br>{{ group.Description }}<br>Members: {{ group.NumberOfMembers }}/{{ group.Size }}
      </div>
    </div>
</template>


<style>
.groupss {
  display: flex; /* Use flexbox to lay out children */
  flex-wrap: wrap; /* Allow children to wrap to next line */
  gap: 10px; /* Optional: adds space between children */
  justify-content: center; /* Center children horizontally in the container */
  align-items: center; /* Center children vertically in the container */
}


.groupDisplay {
  border-radius: 10px; /* Rounded corners */
  background-color: #FFDE59; /* Background color */
  padding: 20px; /* Space inside the rectangle */
  margin-bottom: 10px; /* Space below the rectangle, for when they wrap */
  box-sizing: border-box; /* Include padding and border in the width and height totals */
  flex: 0 1 auto; /* Don't grow, but allow to shrink and keep their auto base size */
  cursor: pointer;
  width: 300px; /* You can set a specific width or use a percentage */
  height: auto; /* Height will be determined by the content size */
  /* font-family: Inter; */
}
</style>