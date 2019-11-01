<template>
  <div class="most-active">

    <div v-on:click="sendActive(format)" class="most-active-container" v-bind:key="format.symbol" v-for="format in info">
      <span>{{format.symbol}}</span>
      <span>{{format.latestPrice}}</span>
      <span>{{(format.changePercent *100).toFixed(2)}}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Active",
  data: () => {
    return {};
  },
  props: {
    info: Array
  },
  methods: {
    sendActive: function(symbol) {
      this.$emit("handleActiveSubmit", symbol);
    }
  },
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
.most-active {
  height: 300px;
  flex-basis: 30%;
    display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4px;
  border: #42b983 solid 2px;
}
.most-active-container {
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}
.most-active-container:active {
  color: #42b983;
}
.most-active-container span:nth-child(1) {
  grid-row: 1/3;
  font-size: 20px;
}
</style>
