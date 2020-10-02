<template>
  <div class="search-bar" >
        <div v-on:click="filterShow=!filterShow" class="filter-container">
          <div class="las la-filter"></div>
          <div>Filter</div>
        </div>
      <FilterProps v-bind:filterShow="filterShow"/>
      <div v-on:click="filterShow=false">
        <input placeholder="Search by..." class="input" v-model="inputValue" v-on:keydown.13="submit">
        <div class="las la-search"></div>
      </div>
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
      this.filterShow = false;
    } 
  }}
}
</script>

<style scoped>
.input{
    width: calc(73vw - 100px - 3rem);
    padding: .75rem 1rem .55rem 1rem;
    background-color: transparent;
    border: none;
    outline: transparent;
    color: #ffffff;
    font-size: 1.1rem;
}

.las{
    font-size: 1.3rem;
    margin-right: .8rem;
}

.las.la-search{
    font-size: 1.7rem;
}

.search-bar{
    display: flex;
    align-items: center;
    padding: 0 1rem;
    color: #ffffff;
    background-color: #1861a9b2;
    z-index: 3;
}

.search-bar>*{
    display: flex;
    align-items: center;
}

.filter-container{
    display: flex;
    font-size: 1.2rem;
    align-items: center;
    font-weight: lighter;
    letter-spacing: .1rem;
    width: 17vw;
    min-width: 220px;
    margin-left: .5rem;
    padding: 1.3rem 1rem 1.1rem 1rem;
    margin-right: 1rem;
    background-color: #20568c63;
    transition: background-color .1s;
}

.filter-container:hover{
    cursor: pointer;
    background-color: #15457576;
}

.search-bar> :last-child{
    width: calc(73vw - 100px - 3rem);
    background-color: #f6fdff3b;
    border-radius: 10px;
}

::placeholder{
    color: #ffffffd3;
    font-family: 'Quicksand', sans-serif;
}

</style>