<template>
    <DayPilotMonth id="dp" :config="config" />
  </template>

<script>
import {DayPilot, DayPilotMonth} from '@daypilot/daypilot-lite-vue'

export default {
  name: 'MonthlyCalendar',
  data: function() {
    return {
      config: {
        startDate: "2022-10-01",
      }
    }
  },
  components: {
    DayPilotMonth
  },
}
</script>
