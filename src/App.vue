<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
@import './assets/css/public.css';
@import './assets/css/common.css';
#app {
  font-family: tahoma, arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft Yahei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
