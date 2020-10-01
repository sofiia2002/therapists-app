<template>
  <div class="shadow-container" v-bind:class="{ 'show' : this.isCalendarOpened }">
    <div class="calendar">
        <div>
          <div>Choose day to see available time spans</div>
          <div class="las la-times" v-on:click="closeCalendar"></div>
        </div>

        <template v-if="isDataMounted">
          <div class="date-container">
            <v-calendar :attributes='attributes' :min-date='new Date()'>
              <div slot="day-popover" slot-scope="{ attributes }">
                  <div v-for="{key, customData} in attributes" :key="key" class="date-time-container">
                    <div v-for="day in customData" v-bind:key="day+Math.random()+Math.random()+Math.random()" class="date-time-span">
                      {{ day }}
                    </div>
                  </div>
              </div>
            </v-calendar>
          </div>
        </template>

    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "Calendar",
  components: {
  },
  props: [
      "isCalendarOpened",
      "therapist"
  ],
  data() {
    return{
      isDataMounted: false,
      doctorDates: [],
    }
  },
  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.doctorDates.map(doctorDate => ({
          dates: doctorDate.date,
          dot: {
            color: 'blue',
          },
          popover: {
            visibility: 'click',
            hideIndicator: true,
          },
          customData: doctorDate.timeSpans
        })),
      ];
    }
  },
  mounted: function(){
    let dates = this.therapist.available_dates;
    dates = dates.map(data=>moment(data).format('YYYY-MM-DD, hh:mm'))
    let days = dates.map(data=>{
      return data.split(', ')[0]
    });
    let filteredDays = days.filter((item, pos)=> days.indexOf(item)== pos);
    for (let i=0; i<filteredDays.length; i++){
      let timeSpans = [];
      timeSpans = dates.filter(data=> data.split(', ')[0] === filteredDays[i])
                          .map(data=>data.split(', ')[1]).sort();
      this.doctorDates.push({ date: filteredDays[i], timeSpans: timeSpans});
    }
    this.isDataMounted = true;
  },
  methods: {
      closeCalendar() {
        this.$emit('close-calendar');
      },
      showTimeSpans() {
        console.log(this.selectAttribute);
        this.isClicked = true;
      }
  }
}
</script>

<style scoped>
.shadow-container{
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000002f;
    z-index: 10;
}

.show{
    display: flex;
}

.calendar{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 440px;
    width: 350px;
    border-radius: 15px;
    background-color: #ffffff;
    overflow: hidden;
}

.calendar > :first-child{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: rgba(27, 90, 154, 0.572);
  padding: 1rem 2rem 1rem 2rem;
  color: #ffffff;
}

.calendar > :first-child > :first-child{
  width: 70%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: .5rem;
  margin-left: 3.3rem;
}

.calendar > :first-child > :nth-child(2){
  color: #ffffff82;
  transition: color .1s;
  position: relative;
  top: -17px;
  right: 15px;
}

.calendar > :first-child > :nth-child(2):hover{
  color: #ffffff;
  cursor: pointer;
}

.date-container{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #000000;
  padding: .5rem;
  margin: 2rem 0;
}

.date-container>*{
  border: none;
}

.time-spans-container{
  display: flex;
  flex-direction: column;
}

.hide-container{
  display: none;
}

.date-time-container{
  padding: .2rem 0;
}

.date-time-span{
  padding: .2rem .3rem;
  border-radius: 3px;
  transition: background-color .1s;
}

.date-time-span:hover{
  cursor: pointer;
  background-color: #ffffff39;
}

</style>