<template>
  <div class="area-wrapper" id="area-wrapper-id">
    <div class="area-svg-wrapper"></div>
    <div class="area-range-wrapper"  v-if="this.chartDataLoaded">
      <span class="area-range" @click="updateChartRequest('1m')">1m</span>
      <span class="area-range" @click="updateChartRequest('3m')">3m</span>
      <span class="area-range" @click="updateChartRequest('6m')">6m</span>
      <span class="area-range" @click="updateChartRequest('ytd')">ytd</span>
      <span class="area-range" @click="updateChartRequest('1y')">1y</span>
      <span class="area-range" @click="updateChartRequest('2y')">2y</span>
      <span class="area-range" @click="updateChartRequest('5y')">5y</span>
    </div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "AreaChart",
  data: function() {
    return {
      xSc: null,
      ySc: null,
      svg: null,
      dateTicks: null,
      margin: {},
      chartDataLoaded: false
    };
  },
  props: {
    info: Array,
    height: Number,
    width: Number,
    d3Id: String
  },
  methods: {
    initAreaChart: function() {
      this.chartDataLoaded = true;
      // create chart container.
      console.log(this.info);
      let margin = { top: 20, right: 20, bottom: 20, left: 20 };
      let svgHeight = this.height + margin.top + margin.bottom;
      let svgWidth = this.width + margin.left + margin.right;
      console.log(svgHeight, svgWidth);
      d3.select(".area-svg-wrapper")
        .append("svg")
        .attr("class", "area-svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("fill", "black")
    },
    updateChartRequest: function(range) {
      alert(range);
      this.$emit("handleChartUpdate", range);
    }
  },
  mounted: function() {},
  watch: {
    chartType: function() {},
    info: function() {
      this.initAreaChart();
    }
  }
};
</script>
<style scoped>
.line-svg-wrapper {
  /* border: 2px solid cornflowerblue; */
  width: 90%;
  margin: auto;
}
.area-range {
  font-size: 12px;
  cursor: pointer;
  margin: 0 10px;
  font-weight: 800;
}
</style>