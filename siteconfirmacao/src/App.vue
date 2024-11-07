<template>
<NavPage></NavPage>
<ContentPage></ContentPage>
<FooterPage></FooterPage>
</template>

<script>
import ContentPage from './components/ContentComp.vue';
import FooterPage from './components/FooterComp.vue';
import NavPage from './components/NavComp.vue';

export default {
  name: 'App',
  components: {
    NavPage, ContentPage, FooterPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
}
</style>
