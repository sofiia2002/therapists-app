<template>
  <div class="search-bar" >
      <div v-on:click="filterShow=false">
        <input placeholder="Search by..." class="input" v-model="inputValue" v-on:keydown.13="submit">
        <div class="las la-search"></div>
      </div>
        <div v-on:click="filterShow=!filterShow" class="filter-container">
          <div class="las la-filter"></div>
          <div>Filter</div>
        </div>
      <FilterProps v-bind:filterShow="filterShow"/>
  </div>
</template>

<script>
import FilterProps from "./FilterProps";

export default {
  name: "Search",
  components: {
    FilterProps
  },
  data () {
    return {
      inputValue: "",
      filterShow: false,
    }
  },
  mounted(){
    this.setSearchValue();
  },
  methods: {
    submit() {
      this.$router.push({ path: 'search', query: {...this.$router.currentRoute.query, q: this.inputValue.trim(), page: 1 }}).catch(error => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
    },
    setSearchValue(){
      if(this.$router.currentRoute.query.q!==undefined) {
        this.inputValue = this.$router.currentRoute.query.q;
      } else {
        this.inputValue = "";
      }
    }
  },
  watch: { $route(to, from) {
    if (to !== from) {
      this.setSearchValue();
    } 
  }}
}
</script>

<style scoped>

.las{
    font-size: 1.3rem;
    margin-right: .8rem;
}

.las.la-search{
    font-size: 1.7rem;
}

.search-bar>*{
    display: flex;
    align-items: center;
}

@media (min-width: 701px) {

.search-bar{
    display: flex;
    align-items: center;
    color: #ffffff;
    background-color: #1861a9b2;
    z-index: 3;
}


.input{
    width: calc(64vw - 100px - 3rem);
    padding: .75rem 1rem .55rem 1rem;
    background-color: transparent;
    border: none;
    outline: transparent;
    color: #ffffff;
    font-size: 1.1rem;
}


.search-bar> :first-child{
    width: calc(64vw - 100px - 3rem);
    background-color: #f6fdff3b;
    border-radius: 10px;
    margin-right: auto;
    margin-left: calc(20% - 24px);
}


.filter-container{
    display: flex;
    font-size: 1.2rem;
    align-items: center;
    font-weight: lighter;
    letter-spacing: .1rem;
    width: 17vw;
    min-width: 220px;
    margin-left:auto;
    margin-right: 24px;
    padding: 1.3rem 1rem 1.1rem 1rem;
    margin-right: 1rem;
    background-color: #20568c63;
    transition: background-color .1s;
}

}


@media (max-width: 701px) {
  .search-bar{
    display: flex;
    align-items: center;
    padding: .5rem 1rem;
    color: #ffffff;
    background-color: #1861a9b2;
    z-index: 3;
    overflow: hidden;
}


.input{
    width: 77vw;
    padding: .75rem 1rem .55rem 1rem;
    background-color: transparent;
    border: none;
    outline: transparent;
    color: #ffffff;
    font-size: 1.1rem;
}


.search-bar> :first-child{
    width: 82vw;
    background-color: #f6fdff3b;
    border-radius: 10px;
}


.filter-container{
    display: flex;
    font-size: 1.2rem;
    align-items: center;
    font-weight: lighter;
    letter-spacing: .1rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    margin-left: 1rem;
    padding: 1rem 0.4rem 1rem 1.2rem;
    background-color: #20568c63;
    border-radius: 10px;
    transition: background-color .1s;
}


.filter-container > :last-child{
  display: none;
}
}



.filter-container:hover{
    cursor: pointer;
    background-color: #15457576;
}

::placeholder{
    color: #ffffffd3;
    font-family: 'Quicksand', sans-serif;
}

</style>