<template>
  <div class="doctor">
      <img v-bind:src="therapist.photo!==null? therapist.photo : imgLink"/>
      <div>
        <h2>{{ therapist.user.first_name + " " + therapist.user.last_name }}<span class="doctor-price">{{ therapist.price_per_hour + " usd/h" }}</span></h2>
        <div class="doctor-rate">
          <span class="las la-star" v-bind:class="{'full': therapist.rating>=1}"/>
          <span class="las la-star" v-bind:class="{'full': therapist.rating>=2}"/>
          <span class="las la-star" v-bind:class="{'full': therapist.rating>=3}"/>
          <span class="las la-star" v-bind:class="{'full': therapist.rating>=4}"/>
          <span class="las la-star" v-bind:class="{'full': therapist.rating===5}"/>
        </div>
        <h5>
          <span v-bind:key="specialization" v-for="specialization in therapist.specializations">
            {{ specialization }}
          </span>
        </h5>
        <h3>{{ therapist.description }}</h3>
      </div>
      <div class="btn-calendar" v-on:click="openCalendar">
        <div class="las la-calendar"></div>
      </div>
  </div>
</template>

<script>
const imgLink = require('../assets/user.png')

export default {
    name: "Doctor",
    props: [
        "therapist"
    ],
    data(){
        return{
          imgLink
        }
    },
    methods: {
        openCalendar() {
         this.$emit('open-calendar', this.therapist);
        }
    }
}
</script>

<style scoped>
@media (min-width: 701px) {
.doctor{
    display: flex;
}
}

@media (max-width: 700px) {
.doctor{
    display: flex;
    flex-direction: column;
}
}

.doctor{
    margin: 1rem .5rem;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px #82828228;
}

.doctor > :nth-child(2){
    margin: .8rem;
}

.doctor img{
    width: 90px;
    max-height: 90px;
    margin: .8rem;
}

.doctor h2{
    line-height: 1.4rem;
    font-size: 1.4rem;
    margin: 0;
    margin-bottom: .5rem;
    padding: 0;
}

.doctor h3{
    line-height: 1.2rem;
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
    font-weight: normal;
}

.doctor h5{
    line-height: .8rem;
    font-size: .8rem;
    font-weight: normal;
    word-spacing: .2rem;
    margin: .5rem 0;
}

.doctor-price{
    margin-left: .7rem;
    font-size: .8rem;
    color: #00000053;
    font-weight: normal;
}

.doctor-rate > *{
    color: #4f4f4f22;
}

.full{
    color: #ffde0b;
}

.btn-calendar{
    display: flex;
    justify-content: center;
    align-content: center;
    margin-left: auto;
    margin-top: auto;
    padding: .8rem;
    height: 1.7rem;
    background-color: #4194d03b;
    box-shadow: 0 0 10px #82828228;
    color: #264884;
    border-radius: 13px;
    font-size: 1.7rem;
}

.btn-calendar:hover{
    cursor: pointer;
    
}
</style>