<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
 #app{
   display: flex;
   flex-direction: column;
   font-family: 'Quicksand', sans-serif;
 }

 ::-webkit-scrollbar{
    width: 6px;
    background-color: #f5f5f5;
 }

 ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #175387ab;
}

::-webkit-scrollbar-track {
    border-radius: 2px;
    background-color: #f5f5f5;
}
</style>
