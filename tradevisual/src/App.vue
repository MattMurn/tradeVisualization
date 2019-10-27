<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <SearchBar v-on:handleTickerSubmit="handleSubmit"/>
    <CompanyInfo :info='this.submitResponse'/>
    <p>{{this.ticker}}</p>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import CompanyInfo from './components/CompanyInfo.vue';
export default {
  name: 'app',
  components: {
    SearchBar,
    CompanyInfo
  },
  data:  () => {
    return {
      ticker: "",
      submitResponse: {}
    }
  },
  methods: {
    handleSubmit: function(response) {
      console.log(response);
      this.submitResponse = response;
      console.log('submit clicked');
    }
  },
  mounted() {
    console.log('app initialized & mounted');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
