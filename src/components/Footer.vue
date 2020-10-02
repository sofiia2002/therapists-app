<template>
  <div class="footer">
      <div class="logo-column">
        <div>
          <div class="las la-leaf"></div>
          <div>CALMSIE</div>
        </div>
        <div>
          <div>Lublin, Poland, Street 22/2</div>
          <div>+48 444 555 666</div>
        </div>
      </div>
      <div class="nav-column">
        <div>About as</div>
        <div>
          <div>About</div>
          <div>Our mission</div>
          <div>Awards</div>
          <div>Story</div>
        </div>
      </div>
      <div class="nav-column">
        <div>Important</div>
         <div>
          <div>Agreement</div>
          <div>Other stuff</div>
          <div>Some info</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer{
    display: flex;
    margin-top: auto;
    height: 200px;
    width: 100%;
    padding: 4.5rem 0;
    background-color: #1861a9b2;
    color: #ffffff;
    transition: color .1;
}

.logo-column{
  width: 50%;
  margin-left: 10%;
}

.logo-column{
  display: flex;
  flex-direction: column;
}

.logo-column> :first-child {
  margin-bottom: 2rem;
  font-size: 1.3rem;
}

.logo-column> :first-child > :first-child {
  font-size: 2.5rem;
  margin-bottom: .8rem;
}

.nav-column{
  width: 20%;
}

.nav-column> :first-child{
  color: #ffffff;
  font-size: 1.15rem;
  margin-bottom: 1rem;
}

.nav-column> :first-child:hover{
  cursor: pointer;
}

.nav-column > :not(:first-child){
  color: #ffffff9c;
  font-size: .9rem;
}

.nav-column > :not(:first-child) > *{
   margin-bottom: .5rem;
}

.nav-column > :not(:first-child) > *:hover{
  color: #ffffffc6;
  cursor: pointer;
}

</style>