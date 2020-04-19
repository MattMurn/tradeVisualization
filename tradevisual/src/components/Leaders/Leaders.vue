<template>
  <div class="index-leaders-wrapper">
    <!-- <treemap :info="this.info" :targetAttribute="this.id" :id="`${this.id}--treemap`"/> -->
    <div class="index-leaders-header">
    <h1 @click="leaderClick()">{{title}}</h1>
    <Tooltip :id="title" top="0" right="10px"/>
    </div>
    <div v-if="showInfo" class="index-leaders">
      <div class="index-leaders-container index-leaders-sub">
      <span>Symbol</span>
      <span v-if="title === 'Active'">Volume(mm)</span>
      <span v-else>Price</span>
      <span>Change</span>
      </div>
      <div
        @click="sendActive(info)"
        class="index-leaders-container"
        v-bind:key="info.symbol"
        v-for="info in info"
      >
        <span>{{info.symbol}}</span>
        <span v-if="title === 'Active'">{{(info.volume/1000000).toFixed(2)}}</span>
        <span v-else>${{info.latestPrice}}</span>
        <span>{{(info.changePercent *100).toFixed(2)}}%</span>
      </div>
    </div>
    <div v-else class="index-leaders-chart" :id='`${id}`'></div>
  </div>
</template>

<script>
import Tooltip from "../Tooltip/Tooltip.vue";
// import Treemap from "../Charts/Treemap/Treemap.vue";
export default {
  name: "Leaders",
  components: {
    Tooltip,
    // Treemap
  },
  data: () => {
    return {
      showInfo: true,
      showChart: false,

    };
  },
  props: {
    info: Array,
    title: String,
    id: String
  },
  methods: {
    sendActive: function(symbol) {
      this.$emit("handleActiveSubmit", symbol);
    },
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './Leaders.scss';
</style>
