<template>
  <div class="boxplot-wrapper" id="boxplot-wrapper-id">
    <div class="boxplot-svg-wrapper" v-if="this.info"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "LineChart",
  data: function() {
    return {
      width: 0
    };
  },
  props: {
    info: Array,
    height: Number
  },
  methods: {
    destroyChart: function() {
      d3.select("svg").remove();
    },
    initChart: function() {
      //create range from min/max values of date & highs
      // const xSpan = d3.extent(this.info);
      let chartPadding = 50;
      const ySpan = d3.extent(this.info.map(point => point.close));

      const xSc = d3
        .scaleBand()
        .domain(this.info.map(point => point.date))
        .range([0, this.width - chartPadding]);

      const ySc = d3
        .scaleLinear()
        .domain(ySpan)
        .range([this.height - chartPadding, 0]);

      // create the svg container
      d3.select(".boxplot-svg-wrapper")
        .append("svg")
        .attr("class", "bloxplot-svg")
        .style("height", this.height - 10)
        .style("width", "100%");
      // add group element
      d3.select("svg").append("g");

      //build x&y axis
      var yAxis = d3.axisRight().scale(ySc);
      d3.select("svg")
        .append("g")
        .attr("id", "yAxisG")
        .style("color", "cornflowerblue")
        .style("font-weight", 600)
        .call(yAxis);
      var xAxis = d3.axisBottom().scale(xSc);
      d3.select("svg")
        .append("g")
        .attr("id", "xAxisG")
        .style("color", "cornflowerblue")
        .style("font-weight", 600)
        .call(xAxis);

      // add plot points to chart.
      d3.select("g")
        .selectAll("circle")
        .data(this.info)
        .enter()
        .append("circle")
        .attr("r", 1)
        .attr("cx", d => xSc(d.date)) // buffer for border - TODO fix this.
        .attr("cy", d => ySc(d.close) + 10) // buffer for border
        .style("fill", "cornflowerblue");

      // create line paths -- needs to be same as plot points
      var tweetLine = d3
        .line()
        .x(d => xSc(d.date))
        .y(d => ySc(d.close) + 10);
      d3.select("svg")
        .append("path")
        .attr("d", tweetLine(this.info))
        .attr("fill", "none")
        .attr("stroke", "cornflowerblue")
        .attr("stroke-width", 2);

    }
  },
  mounted: function() {
    this.width = document.getElementById(
      "boxplot-wrapper-id"
    ).parentElement.offsetWidth;
  },
  updated: function() {
    this.destroyChart();
    this.initChart();
  }
};
</script>
<style scoped>
.boxplot-svg-wrapper {
  /* border: 2px solid cornflowerblue; */
  width: 90%;
  margin: auto;
}
</style>