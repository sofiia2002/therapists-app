<template>
  <div class="top-nav">
    <div>
        <div class="las la-leaf"></div>
        <div>CALMSIE</div>
    </div>
    <div>
        <div class="clicked">Home</div>
        <div>About</div>
        <div>Reviews</div>
        <div>Contact</div>
    </div>
  </div> 
</template>

<script>

export default {
  name: "Title",
}
</script>

<style scoped>

.top-nav{
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: .1rem 1rem;
}

.top-nav > :last-child{
  display: flex;
  margin-left: 1.5rem;
}

.top-nav > :last-child > *{
   padding: .3rem .5rem;
   margin: 0 1.5rem;
   font-size: 1.1rem;
   transition: border .1s;
   color: #0d3a71;
}
.top-nav > :last-child > *:not(.clicked){
   border-bottom: 1px solid transparent;
   cursor: pointer;
}

.top-nav > :last-child >*:hover{
  border-bottom: 1px solid #0d3a71;
}

.top-nav > :first-child{
    display: flex;
    align-items: center;
    width: calc(17vw - 1rem);
    min-width: calc(170px - 1rem);
    margin-left: 2rem;
    border-bottom: none;
    padding: 1rem 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: #0d3a71;
}

.top-nav > :first-child:hover{
    cursor: pointer;
}

.clicked{
   cursor: default;
   border: 1px solid #0d3a71;
   border-radius: 5px;
}

.las{
    font-size: 3.3rem;
    margin-right: .5rem;
    transform: rotate(10deg);
}
</style>