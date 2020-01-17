<template>
  <div class="line-wrapper" id="line-wrapper-id">
    <div class="line-svg-wrapper" v-if="this.info"></div>
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
    height: Number,
    d3Id: String
  },
  methods: {
    destroyChart: function() {
      d3.select(`#${this.d3Id}-svg`).remove();
    },
    initChartContainer: function() {
      // const MARGIN = { top: 20, right: 10, bottom: 20, left: 10 };
      // let width = 960 - margin.left - margin.right;
      // let height = 500 - margin.top - margin.bottom;

      //create range from min/max values of date & highs
      // const xSpan = d3.extent(this.info);

      // create the svg container
      // d3.select(".line-svg-wrapper")
      //   .append("svg")
      //   .attr("id", `${this.d3Id}-svg`)
      //   .style("height", this.height - 10)
      //   .style("width", "100%");
      // add group element
      // d3.select(`#${this.d3Id}-svg`)
      //   .append("g")
      //   .attr("id", `#${this.d3Id}-g`);

      //build x&y axis
      // var yAxis = d3.axisRight().scale(ySc);
      // d3.select(`#${this.d3Id}-svg`)
      //   .append("g")
      //   .attr("id", "yAxisG")
      //   .style("color", "cornflowerblue")
      //   .style("font-weight", 600)
      //   .call(yAxis);

      // var xAxis = d3.axisBottom().scale(xSc);
      // d3.select(`#${this.d3Id}-svg`)
      //   .append("g")
      //   .attr("id", "xAxisG")
      //   .style("color", "cornflowerblue")
      //   .style("font-weight", 600)
      //   .call(xAxis);
    },
    initLineChart: function() {
      // this.initChartContainer();

      //create range from min/max values of date & highs
      // const xSpan = d3.extent(this.info);
      let chartPadding = 20;
      const ySpan = d3.extent(this.info.map(point => point.close));

      const xSc = d3
        .scaleBand()
        .domain(this.info.map(point => point.date))
        .range([50, this.width - chartPadding]);

      const ySc = d3
        .scaleLinear()
        .domain(ySpan)
        .range([this.height - chartPadding, 0]);

      // // create the svg container
      d3.select(".line-svg-wrapper")
        .append("svg")
        .attr("id", `${this.d3Id}-svg`)
        .style("height", this.height - 10)
        .style("width", "100%");
      // // add group element
      d3.select(`#${this.d3Id}-svg`)
        .append("g")
        .attr("id", `#${this.d3Id}-g`);

      // //build x&y axis
      var yAxis = d3.axisRight().scale(ySc);
      d3.select(`#${this.d3Id}-svg`)
        .append("g")
        .attr("id", "yAxisG")
        .style("color", "cornflowerblue")
        .style("font-weight", 600)
        .call(yAxis);

      // var xAxis = d3.axisBottom().scale(xSc);
      // d3.select(`#${this.d3Id}-svg`)
      //   .append("g")
      //   .attr("id", "xAxisG")
      //   .style("color", "cornflowerblue")
      //   .style("font-weight", 600)
      //   .call(xAxis);

      // add plot points to chart.
      d3.select(`#${this.d3Id}-g`)
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
      d3.select(`#${this.d3Id}-svg`)
        .append("path")
        .attr("d", tweetLine(this.info))
        .attr("fill", "none")
        .attr("stroke", "cornflowerblue")
        .attr("stroke-width", 2);
    },
    initHistoChart: function() {
      // let histo = d3.histogram();
      // let histoChart = histo(this.info);

      // histo
      //   .domain(xSc.domain)
      //   .thresholds(d => d.length)
      //   .value(d => d.high);

      // d3.select("svg")
      //   .selectAll("rect")
      //   .data(histoChart)
      //   .enter()
      //   .append("rect")
      //   .attr("id", "test")
      //   .attr("x", d => xSc(d.date)) // buffer for border - TODO fix this.
      //   .attr("y", d => ySc(d.close) + 10) // buffer for border
      //   .attr("width", d => xSc(d.x1 - d.x0) - 2)
      //   .attr("height", d => 400 - ySc(d.length))
      //   .style("fill", "#FCD88B");
    }
  },
  mounted: function() {
    this.width = document.getElementById(
      "line-wrapper-id"
    ).parentElement.offsetWidth;
  },
  updated: function() {
    this.destroyChart();
    this.initLineChart();
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