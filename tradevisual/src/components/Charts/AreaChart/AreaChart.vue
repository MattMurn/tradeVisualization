<template>
  <div class="area-wrapper" id="area-wrapper-id">
    <div class="area-svg-wrapper"></div>
    <div class="area-range-wrapper" v-if="this.chartDataLoaded">
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
      svg: null,
      svgHeight: null,
      xScale: null,
      yScale: null,
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
      let margin = { top: 20, right: 20, bottom: 20, left: 20 };
      this.svgHeight = this.height + margin.top + margin.bottom;
      let svgWidth = this.width + margin.left + margin.right;
      this.svg = d3
        .select(".area-svg-wrapper")
        .append("svg")
        .attr("class", "area-svg")
        .attr("width", svgWidth)
        .attr("height", this.svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.xScale = d3
        .scaleTime()
        .domain(d3.extent(this.info, d => d3.timeParse("%Y-%m-%d")(d.date)))
        .range([0, svgWidth]);

      this.yScale = d3
        .scaleLinear()
        .domain([d3.max(this.info, d => d.close), 0])
        .range([0, this.svgHeight]);

      this.updateAreaChart();
    },
    updateAreaChart: function() {
      let transition = d3.transition().duration(750);
      // update domains
      // this.xScale.domain(d3.extent(this.info, d => d3.timeParse("%Y-%m-%d")(d.date)));
      // this.yScale.domain([this.svgHeight, 0]);
      this.info.forEach(d => console.log(d.close));
      // remove old data

      this.svg
        .selectAll("path")
        .datum(this.info)
        .exit()
        .transition(transition)
        .attr(
          "d",
          d3
            .area()
            .x(0)
            .y(this.svgHeight)
        )
        .remove();

      this.svg
        .append("path")
        .datum(this.info)
        .attr("fill", "cornflowerblue")
        .attr("stroke", "cornflowerblue")
        .attr("stroke-width", 2.5)
        .attr(
          "d",
          d3
            .area()
            .x(0)
            .y(this.svgHeight)
        )
        .transition(transition)
        .attr(
          "d",
          d3
            .area()
            .x(d => this.xScale(d3.timeParse("%Y-%m-%d")(d.date)))
            .y0(this.yScale(0))
            .y1(d => this.yScale(d.close))
        );
    },
    updateChartRequest: function(range) {
      this.$emit("handleChartUpdate", range);
    }
  },
  mounted: function() {},
  watch: {
    chartType: function() {},
    info: function() {
      if (this.chartDataLoaded) {
        this.updateAreaChart();
      } else {
        this.initAreaChart();
      }
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