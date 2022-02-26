<template>
  <div id="app">
      <v-app>
      <v-main>
        <v-container fluid style="max-width: 90%" class="mt-5 pt-5">
          <router-view/>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'cpmain',
    data(){
      return {
        toggle_exclusive: undefined,
      }
    },
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.loader{
    top:100px;
    right:0px;
    width:100%;
    height:100%;
    background-color:#eceaea;
    background-image: url('assets/dualball.gif');
    background-size: 50px;
    background-repeat:no-repeat;
    background-position:center;
    z-index:10000000;
    opacity: 0.4;
    filter: alpha(opacity=40);
}
</style>
