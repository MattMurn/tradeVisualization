<template>
  <div class="search-bar">
    <h1>Welcome to this Gnarly Search Bar</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <input v-model="ticker" type="text" />
    <button v-on:click="searchClick(ticker)">search new ticker</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchBar",
  data: () => {
    return {
      ticker: "",
      responseData: {}
    };
  },
  methods: {
    searchClick: function(ticker) {
      axios
        .get(`/product-source/company/${ticker}`)
        .then(data =>{
          this.responseData = data.data;
          this.$emit("handleTickerSubmit", this.responseData)
        })
        .catch(error => {
          console.log(error)
          this.responseData = {"error": "something went wrong retreiving that ticker"}
        });
    }
  },
  mounted() {
    console.log('searchBar mounted');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
