<template>
  <div class="search-bar">
    <input class="search-bar-input" placeholder="symbol" v-model="symbol" type="text" />
    <button class="search-bar-submit" v-on:click="searchClick(symbol)">Search</button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => {
    return {
      symbol: "",
      responseData: {}
    };
  },
  methods: {
    searchClick: function(symbol) {
      this.$emit("handleSymbolSubmit", symbol);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './SearchBar.scss';
</style>
