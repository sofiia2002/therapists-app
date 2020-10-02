<template>
  <div class='filter-box' v-bind:class="{'show': filterShow}" >
      <div class="filtering">
        <div>Filter</div>
        <div>
           <div>Specialization</div>
           <div v-bind:key="spec" v-for="spec in Object.keys(specs)">
             <label v-bind:for="specs[spec]">
               <input type="checkbox" v-model="specs[spec]" v-bind:id="specs[spec]"/>
               <div>{{spec}}</div>
             </label>
           </div>
        </div>
        <div>
           <div>Rating</div>
           <div>
             <label for="rateFive">
               <input type="checkbox" v-model="rate['five']" id="rateFive"/>
               <div><span class="las la-star" /><span class="las la-star" /><span class="las la-star" /><span class="las la-star" /><span class="las la-star" /></div>
             </label>
             <label for="rateFour">
               <input type="checkbox" v-model="rate['four']" id="rateFour"/>
               <div><span class="las la-star" /><span class="las la-star" /><span class="las la-star" /><span class="las la-star" /></div>
             </label>
             <label for="rateThree">
               <input type="checkbox" v-model="rate['three']" id="rateThree"/>
               <div><span class="las la-star" /><span class="las la-star" /><span class="las la-star" /></div>
             </label>
             <label for="rateTwo">
               <input type="checkbox" v-model="rate['two']" id="rateTwo"/>
               <div><span class="las la-star" /><span class="las la-star" /></div>
             </label>
              <label for="rateOne">
               <input type="checkbox" v-model="rate['one']" id="rateOne"/>
               <div><span class="las la-star" /></div>
             </label>
           </div>
        </div>
        <div>
           <div>Language</div>
           <div v-bind:key="lang" v-for="lang in Object.keys(langs)">
             <label v-bind:for="langs[lang]">
               <input type="checkbox" v-model="langs[lang]" v-bind:id="langs[lang]"/>
               <div>{{lang}}</div>
             </label>
           </div>
        </div>
        <div>
           <div>Price</div>
           <div>
             <div>
               <div>From:</div>
               <input v-model="price['from']" class="value" @keypress="isNumber($event)"/>
             </div>
             <div>
               <div>To:</div>
               <input class="value" v-model="price['to']" @keypress="isNumber($event)">
             </div>
           </div>
        </div>
      </div>
      <div class="sorting">
        <div>Sort</div>
        <div>
            <div>Price</div>
            <div>
              <label for="fromHighPrice">
                <input type="radio" value="desc" id="fromHighPrice" v-model="priceSort"/>
                <div>From high to low</div>
              </label>
              <label for="fromLowPrice">
                <input type="radio" value="asc" id="fromLowPrice" v-model="priceSort"/>
                <div>From low to high</div>
              </label>
           </div>
           <div>Rate</div>
            <div>
              <label for="fromHighRate">
                <input type="radio" value="desc" id="fromHighRate" v-model="rateSort"/>
                <div>From high to low</div>
              </label>
              <label for="fromLowRate">
                <input type="radio" value="asc" id="fromLowRate" v-model="rateSort"/>
                <div>From low to high</div>
              </label>
           </div>
        </div>
      </div>
      <div class="buttons">
        <div class="btn-apply" v-on:click="applyFilters">Apply</div>
        <div class="btn-reset" v-on:click="resetFilters">Reset</div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "FilterProps",
    props: [
      "filterShow"
    ],
    data(){
      return {
        specs: {},
        langs: {},
        rate: {
          one: false,
          two: false,
          three: false,
          four: false,
          five: false
        },
        price: {
          from: "",
          to: ""
        },
        priceSort: "",
        rateSort: "",
        }
    },
    methods:{
      applyFilters(){
        this.filterShow = false;
        let newQueryFilters = {};
        newQueryFilters['specs'] = Object.keys(this.specs).filter((spec)=>this.specs[spec]===true);
        newQueryFilters['langs'] = Object.keys(this.langs).filter((lang)=>this.langs[lang]===true);
        newQueryFilters['rate'] = Object.keys(this.rate).filter((rating)=>this.rate[rating]===true);
        if(this.price['from']!=="") newQueryFilters['from'] = this.price['from'];
        if(this.price['to']!=="") newQueryFilters['to'] = this.price['to'];
        if (this.priceSort!=="") {
          newQueryFilters['priceSort'] = this.priceSort;
        }
        if (this.rateSort!=="") {
          newQueryFilters['rateSort'] = this.rateSort;
        }
        this.$router.push({ path: 'search', query: {...this.$router.currentRoute.query, ...newQueryFilters}}).catch(error => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
      },
      resetFilters(){
        this.getFilters();
        this.$router.push({ path: 'search', query: {q: this.$router.currentRoute.query.q, page: this.$router.currentRoute.query.page}}).catch(error => {
          if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
      },
      getFilters(){
       axios
        .get('https://calmsie.pl/?format=json')
        .then(res => 
        { 
          let newSpecs = [];
          res.data.map((data)=>newSpecs = newSpecs.concat(data.specializations));
          newSpecs = newSpecs.filter((item, pos)=> newSpecs.indexOf(item)== pos).sort();
          newSpecs.map((spec)=>this.specs[spec]=false);

          let newLangs = [];
          res.data.map((data)=>newLangs = newLangs.concat(data.languages));
          newLangs = newLangs.filter((item, pos)=> newLangs.indexOf(item)== pos).sort();
          newLangs.map((lang)=>this.langs[lang]=false);
        })
        .catch(error => console.log(error));
      },
      isNumber(e) {
        e = (e) ? e : window.event;
        var charCode = (e.which) ? e.which : e.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          e.preventDefault();
        } else {
          return true;
        }
      }
    },
    mounted: function(){
      this.getFilters();
    },
     watch: { $route(to, from) {
    if (to !== from) {
      this.filterShow = false;
    } 
  }}
}
</script>

<style scoped>

.filter-box{
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    z-index: 2;
    border-radius: 0 0 10px 10px;
    color: #000000;
    border: 1px solid #0c72b138;
    box-shadow: 0 0 16px 10px #67676728;
    overflow-y: auto;
    overflow-x: hidden;
}

@media (min-width: 701px) {
.filter-box{
    position: absolute;
    top: 150px;
    right: 17px;
    height: 0;
    width: calc(17vw + 2rem);
    min-width: calc(217px + 2rem);
    transition: height .3s;
}

.show{
  max-height: 1437px;
  height: 85vh;
}
}

@media (max-width: 700px) {
.filter-box{
    position: absolute;
    top: 173px;
    right: -250px;
    height: calc(100vh - 150px);
    width: 250px;
    transition: right .3s;
}

.show{
    right: 0px;
}

}

.filtering{
  margin-top: .8rem;
}

.sorting,
.filtering{
  width: 100%;
  margin-top: 1.5rem;
}

.sorting > *,
.filtering > *{
  margin: 0 2rem;
}

.sorting > :first-child,
.filtering > :first-child{
  line-height: 2.1rem;
  font-size: 1.2rem;
  color: #00000077;
}

.sorting> * > :first-child,
.filtering> * > :first-child{
  line-height: 2rem;
  font-size: 1.25rem;
  margin: 0 .5rem;
}

.sorting> :not(:first-child) > :not(:first-child) > *,
.filtering> :not(:first-child) > :not(:first-child) > * {
  margin: .13rem .7rem;
}

.sorting> :nth-child(2),
.sorting> :nth-child(2) > *,
.filtering> :not(:first-child),
.filtering> :not(:first-child) > *{
  display: flex;
  flex-direction: column;
  margin-bottom: .5rem;
}

.sorting> :nth-child(2) > * > *,
.filtering> :not(:first-child) > * > *{
  display: flex;
  flex-direction: row;
}

.sorting> :not(:first-child) > :not(:first-child) > * >:first-child,
.filtering> :not(:first-child) > :not(:first-child) > * >:first-child{
  margin-right: .5rem;
}


.buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-apply,
.btn-reset{
  padding: .5rem 4rem;
  margin-bottom: .5rem;
  border-radius: 10px;
  background-color: #ffffff;
  color: #2381c4d4;
  border: 1.5px solid #2381c4d4;
}

.btn-apply{
  background-color: #2381c4d4;
  color: #ffffff;
}

.btn-apply:hover,
.btn-reset:hover{
  cursor: pointer;
}

span.las{
  margin: 0;
  padding: 0;
}

.filtering > :last-child > :last-child > :last-child > :last-child{
  margin-left: 1.33rem;
}

label:hover{
  cursor: pointer;
}

.value{
  width: 110px;
}

</style>