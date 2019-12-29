<template>
  <div class="boxplot-wrapper">
    <div class="boxplot-svg-wrapper" v-if="this.info"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "BoxPlot",
  data: function() {
    return {};
  },
  props: {
    info: Array,
    height: Number,
    width: Number
  },
  methods: {
    destroyChart: function() {
      d3.select("svg").remove();
    },
    initChart: function() {
      const xSc = d3
        .scaleLinear()
        .domain(0, this.info.length)
        .range([0, this.width]);

      const ySpan = d3.extent(this.info.map(point => point.high));
      const ySc = d3
        .scaleLinear()
        .domain(ySpan)
        .range([0, this.height]);
      // create the svg container
      d3.select(".boxplot-svg-wrapper")
        .append("svg")
        .attr("class", "bloxplot-svg")
        .style("height", this.height)
        .style("width", "100%");

      d3.axisBottom().scale(xSc);
      // d3.axisLeft().scale(ySc);
      d3.select("svg").append("g");
      d3.select("g")
        .selectAll("circle")
        .data(this.info)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cx", (d, i) => i * 50)
        .attr("cy", d => ySc(d.high))
        .style("fill", "#ccc");

      const blue = "#5eaec5";
      let xScale = d3
        .scaleLinear()
        .domain([1, 10.5])
        .range([20, 480]);
      let yScale = d3
        .scaleLinear()
        .domain([0, 35])
        .range([480, 20]);
      let xAxis = d3
        .axisBottom()
        .scale(xSc)
        .tickSize(480)
        .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      d3.select("svg")
        .append("g")
        .attr("id", "xAxisG")
        .call(xAxis);
      let yAxis = d3
        .axisRight()
        .scale(ySc)
        .ticks(10)
        .tickSize(480);
      d3.select("svg")
        .append("g")
        .attr("id", "yAxisG")
        .call(yAxis);

      d3.select("svg")
        .selectAll("circle.tweets")
        .data(this.info)
        .enter()
        .append("circle")
        .attr("class", "tweets")
        .attr("r", 5)
        .attr("cx", d => xScale(d.day))
        .attr("cy", d => yScale(d.tweets))
        .style("fill", blue);
      // check to see what type the data.high is in this instance.
      let lineTemp = this.info.map(data => data.High);
      var tweetLine = d3
        .line()
        .x((d, i) => xScale(i * 50))
        .y(d => yScale(d));
      d3.select("svg")
        .append("path")
        .attr("d", tweetLine(lineTemp))
        .attr("fill", "none")
        .attr("stroke", "#fe9a22")
        .attr("stroke-width", 2);
      // there is something wrong with the way vue is handling "this context"
      //   .each(function(d) {
      //     d3.select(this)
      //       .append("rect")
      //       .attr("width", 20)
      //       .attr("height", ySc(d.high) - ySc(d.low))
      //       .style("fill", "pink");
      //   });
    }
  },
  updated: function() {
    this.destroyChart();
    this.initChart();
  }
};
</script>
<style scoped>
.boxplot-svg-wrapper {
  border: 2px solid cornflowerblue;
  width: 90%;
  margin: auto;
}
</style>