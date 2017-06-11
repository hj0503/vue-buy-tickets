<template>
  <div>
    <calendar-input :limit="firstLimit" @getValue="getValue"></calendar-input>
  </div>

</template>

<script>
import calendarInput from '@/components/calendar/calendar-input'
export default {
  name: 'show-calendar-input',
  components: {
    calendarInput
  },
  data() {
    return {
      selectValue: '',
      firstLimit: {
        minYear: 1900,
        minMonth: 1,
        minDay: 1,
        maxYear: 2018,
        maxMonth: 3,
        maxDay: 23
      }
    }
  },
  methods: {
    getValue(selectValue) {
      this.selectValue = selectValue;
    }
  }
}
</script>