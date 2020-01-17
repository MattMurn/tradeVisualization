<template>
  <div class="search-bar">
    <input class="search-bar-input" v-model="ticker" type="text" />
    <button class="search-bar-submit" v-on:click="searchClick(ticker)">search ticker</button>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './SearchBar.scss';
</style>
