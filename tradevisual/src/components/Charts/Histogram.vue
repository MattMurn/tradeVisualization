<template>
  <div class="line-wrapper" id="line-wrapper-id">
    <!-- <button @click="toggleChartType">{{chartType}}</button> -->
    <div class="line-svg-wrapper" :id="this.d3Id" v-if="this.info"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "Histogram",
  data: function() {
    return {
      width: 0,
      chartType: "Histogram"
    };
  },
  props: {
    info: Array,
    height: Number,
    d3Id: String
  },
  methods: {
    destroyChart: function() {
      d3.select(`#${this.d3Id}-svg`).remove();
    },
    initHistoChart: function() {
      this.destroyChart();
      let mockData = [{a: 1, b: 128},{a: 3, b: 108},{a: 2, b: 118},{a: 4, b: 158},{a: 5, b: 148}];

      let target = d3.select(`#${this.d3Id}`);
      let margin = { top: 20, right: 40, bottom: 20, left: 40 };
      let svgHeight = this.height - margin.top - margin.bottom;
      let svgWidth = this.width - margin.right - margin.left;

      // add svg
       let targetSvg = target
        .append("svg")
        .attr("id", `${this.d3Id}--svg`)
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("translate", `transform(${margin.left}, ${margin.top})`)
        .style("background", "cornflowerblue");

      let xAxis = d3
        .scaleLinear()
        .domain([0, mockData.length])
        .range([0, svgWidth]);

       let yAxis = d3
        .scaleLinear()
        .domain([0, d3.max(d => d.b)])
        .range([0, svgHeight]);

      targetSvg
        .selectAll("rect")
        .data(mockData)
        .enter()
        .append("rect")
        .attr("x", d => xAxis(d.a))
        .attr("y", d => svgHeight - yAxis(d.b))
        .attr("width", "50px")
        .attr("height", d => (d.b))
        .style("fill", "#69b3a2")
        .attr("transform", d => `translate(0, ${svgHeight - d.b})`)
    }
  },
  mounted: function() {
    this.width = document.getElementById(
      "line-wrapper-id"
    ).parentElement.offsetWidth;
  },
  watch: {
    chartType: function() {},
    info: function() {
      this.destroyChart();
      this.initHistoChart();
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
</style>