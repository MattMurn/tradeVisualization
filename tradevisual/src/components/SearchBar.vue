<template>
  <div class="search-bar">
    <h1>Welcome to this Gnarly Search Bar</h1>
    <p>
      -- Enter a valid stock ticker to get the most up to date quotes and charting.
    </p>
    <input v-model="ticker" type="text" />
    <button v-on:click="searchClick(ticker)">search new ticker</button>
  </div>
</template>

<script>
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
          this.$emit("handleTickerSubmit", ticker);
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
