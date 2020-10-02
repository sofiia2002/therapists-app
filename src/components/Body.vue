<template>
  <div class="body">
    <template v-if="therapistsOnPage.length!==0">
      <Doctors v-bind:therapists="therapistsOnPage"/>
      <div class="pages">
        <div 
          class="las la-angle-left" 
          v-on:click="pageDown"
          v-bind:class="{'btn-disabled': query.page<=1}" 
        >
        </div>
        <div>
          <span>{{query.page}}</span> of <span>{{Math.ceil(therapistsNumber/therapistsPerPage)}}</span>
        </div >
        <div 
          class="las la-angle-right" 
          v-on:click="pageUp"
          v-bind:class="{'btn-disabled': query.page >= Math.ceil(therapistsNumber/therapistsPerPage)}" 
        >
        </div>
      </div>
    </template>
    <template v-if="therapistsOnPage.length===0">
      <div class="no-result">
        <div>Looks like we don't have any matches for <span>"{{query.q}}"</span> and for applied filters</div>
        <ul>
          <li>Change your search query</li>
          <li>Change applied filters</li>
        </ul>
        <div>If you still can't find ehat are you looking for, send feedback to help improve our site</div>
      </div>
    </template>
  </div>
</template>

<script>
import Doctors from "./Doctors"
import axios from "axios";

export default {
  name: "Body",
  components: {
    Doctors
  },
  props: [
    "query"
  ],
  data() { 
    return{
      therapistsOnPage: [],
      therapistsPerPage: 7,
      therapistsNumber: 0,
      therapists: []
    }
  },
  mounted: function(){
    this.getUpdatedData();
  },
  methods: {
    pageUp() {
      if(this.query.page < Math.ceil(this.therapistsNumber/this.therapistsPerPage)) {
        this.$router.push({ path: 'search', query: {...this.$router.currentRoute.query, page: parseInt(this.query.page)+1 }});
      }
    },
    pageDown() {
      if(this.query.page > 1) {
        this.$router.push({ path: 'search', query: {...this.$router.currentRoute.query, page: this.query.page-1 }});
      }
    },
    getUpdatedData(){
      if (Object.keys(this.query).length === 0) {
        this.$router.push({ path: 'search', query: { page: 1 }})
      } else {
        axios
          .get('https://calmsie.pl/?format=json')
          .then(res => 
          {
            let therapists = [];
            if (Object.keys(this.query).length === 1 && this.query.page!==undefined) {
              therapists = res.data;
              this.therapistsNumber = therapists.length;
              this.therapistsOnPage = therapists.slice((this.query.page-1)*this.therapistsPerPage, this.therapistsPerPage*this.query.page);
            } else {
              let queryKeys = Object.keys(this.query);
              res.data.map((therapist)=>{
                let isSuitable = true;
                queryKeys.forEach((key)=>{
                  switch(key){
                    case "specs":{
                      if ((!isSuitable)||(this.query['specs'].length===0)) break;
                      let suitableKeys = therapist.specializations.filter((spec)=>this.query['specs'].includes(spec));
                      if (suitableKeys.length!==this.query['specs'].length) isSuitable = false;
                      break;
                    }
                    case "langs":{
                      if ((!isSuitable)||(this.query['langs'].length===0)) break;
                      let suitableKeys = therapist.languages.filter((lang)=>this.query['langs'].includes(lang));
                      if (suitableKeys.length!==this.query['langs'].length) isSuitable = false;
                      break;
                    }
                    case "rate":{
                      if ((!isSuitable)||(this.query['rate'].length===0)) break;
                      let keys = this.query['rate'].map(
                      (key)=>
                        key==="one" ? 1.0 
                        : key==="two" ? 2.0 
                        : key==="three" ? 3.0 
                        : key==="four" ? 4.0 
                        : key==="five" ? 5.0 
                        : null
                      );
                      if (!keys.includes(therapist.rating)) isSuitable = false;
                      break;
                    }
                    case "from":{
                      if (!isSuitable) break;
                      if (therapist.price_per_hour<this.query.from) isSuitable = false;
                      break;
                    }
                    case "to":{
                      if (!isSuitable) break;
                      if (therapist.price_per_hour>this.query.to) isSuitable = false;
                      break;
                    }
                    default: break;
                  }});
                if (isSuitable) therapists.push(therapist);
              });

              if (this.query.q!==undefined){
                therapists = therapists.filter((therapist)=>
                  therapist.specializations.filter((spec)=>{
                    if (spec!==undefined) return spec.indexOf(this.query.q)!==-1
                  }).length!==0
                )
              }

              if (this.query.priceSort==="asc"){
                therapists = therapists.sort((a,b)=>a.price_per_hour-b.price_per_hour)
              }
              if (this.query.priceSort==="desc"){
                therapists = therapists.sort((a,b)=>b.price_per_hour-a.price_per_hour)
              }

              if (this.query.rateSort==="asc"){
                therapists = therapists.sort((a,b)=>a.rating-b.rating)
              }
              if (this.query.rateSort==="desc"){
                therapists = therapists.sort((a,b)=>b.rating-a.rating)
              }

              this.therapists = therapists;
              this.therapistsOnPage = therapists.slice((this.query.page-1)*this.therapistsPerPage, this.therapistsPerPage*this.query.page);
              this.therapistsNumber = therapists.length;
            }
          })
          .catch(error => console.log(error));
     }
    }
  },
  watch: { $route(to, from) {
     if(to !== from) {
      let newTo = {...to.query, page: ""};
      let newFrom = {...from.query, page: ""};
      if ((JSON.stringify(newTo)!==JSON.stringify(newFrom))||(Object.keys(to.query).length === 1 && to.query.page!==undefined)) {
        this.getUpdatedData();
      } else {
        this.therapistsOnPage = this.therapists.slice((this.query.page-1)*this.therapistsPerPage, this.therapistsPerPage*this.query.page);
      }
     } 
    } 
  },
}
</script>

<style scoped>
.body{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
  background-color: #f3f8febf;
}

.pages{
  display: flex;
  margin-top: auto;
  align-items: center;
}

.las.la-angle-right{
  margin-left: .5rem;
}

.las.la-angle-left{
   margin-right: .5rem;
}

.las.la-angle-right:hover,
.las.la-angle-left:hover{
  cursor: pointer;
}

.btn-disabled.las.la-angle-right,
.btn-disabled.las.la-angle-left{
  cursor: default;
  color: #00000035;
}

.no-result{
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.no-result > :first-child{
  font-size: 1.7rem;
}

.no-result > :nth-child(2){
  margin-top: 3rem;
  font-size: 1.1rem;
}

.no-result > :last-child{
  margin-top: .5rem;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.no-result span{
  font-weight: bold;
}
</style>