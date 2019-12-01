<template>
  <div class="search-bar">
    <input class="search-bar-input" v-model="ticker" type="text" />
    <button class="search-bar-submit" v-on:click="searchClick(ticker)">search new ticker</button>
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
    console.log("searchBar mounted");
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
.search-bar-input {
  height: 25px;
  border-radius: 5px;
  margin-right: 15px;
}
.search-bar-submit {
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
  background: #42b983;
  color: white;
}
</style>
