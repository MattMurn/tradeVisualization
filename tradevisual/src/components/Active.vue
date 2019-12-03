<template>
<div class="most-active-wrapper">
    <h1 v-on:click="activeClick()">{{title}}</h1>
  <div v-if="showInfo"  class="most-active">
    <div v-on:click="sendActive(format)" class="most-active-container" v-bind:key="format.symbol" v-for="format in info">
      <span>{{format.symbol}}</span>
      <span>{{format.latestPrice}}</span>
      <span>{{(format.changePercent *100).toFixed(2)}}%</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Active",
  data: () => {
    return {
      showInfo: true
    };
  },
  props: {
    info: Array,
    title: String
  },
  methods: {
    sendActive: function(symbol) {
      this.$emit("handleActiveSubmit", symbol);
    },
    activeClick: function() {
      this.showInfo = !this.showInfo;
    }
  },
  mounted() {
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
  color: cornflowerblue;
}
.most-active-wrapper {
  max-width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}
.most-active {
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4px;
  border: cornflowerblue solid 2px;
}
.most-active-container {
  max-width: 180px;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

}
.most-active-container:active {
  color: cornflowerblue;
}
.most-active-container span:nth-child(1) {
  grid-row: 1/3;
  font-size: 20px;
}
</style>
