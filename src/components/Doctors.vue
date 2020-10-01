<template>
  <div class="doctors">
      <div v-bind:key="therapist.id+''+Math.random()" v-for="therapist in therapists" >
        <Doctor v-bind:therapist="therapist" @open-calendar="openCalendar"/>
      </div>
      <template v-if="isDataLoaded">
        <Calendar v-bind:therapist="therapist" @close-calendar="closeCalendar" v-bind:isCalendarOpened="isCalendarOpened"/>
      </template>
  </div>
</template>

<script>
import Doctor from "./Doctor";
import Calendar from "./Calendar"

export default {
  name: "Doctors",
  components: {
      Doctor,
      Calendar
  },
  data() {
      return{
          isCalendarOpened: false,
          isDataLoaded: false,
          therapist: {},
      }
  },
  props: [
      "therapists",
      "page",
      "resultsPerPage"
  ],
  methods: {
      openCalendar(therapist) {
        this.therapist = therapist;
        this.isCalendarOpened = true;
        this.isDataLoaded = true;
      },
      closeCalendar() {
        this.therapist = {};
        this.isCalendarOpened = false;
        this.isDataLoaded = false;
      }
  }
}
</script>

<style scoped>
.doctors{
    display: flex;
    flex-direction: column;
    width: 80%;
}
</style>