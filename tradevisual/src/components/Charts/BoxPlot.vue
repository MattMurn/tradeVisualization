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
        .scale(xScale)
        .tickSize(480)
        .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      d3.select("svg")
        .append("g")
        .attr("id", "xAxisG")
        .call(xAxis);
      let yAxis = d3
        .axisRight()
        .scale(yScale)
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

      var tweetLine = d3
        .line()
        .x(d => xScale(d.day))
        .y(d => yScale(d.tweets));
      d3.select("svg")
        .append("path")
        .attr("d", tweetLine(this.info))
        .attr("fill", "none")
        .attr("stroke", "#fe9a22")
        .attr("stroke-width", 2);

      // d3.select("svg")
      // .data(this.info).enter()
      // .append("text")
      // .text(d => d.date)
      // .attr("dx", (d, i) => i * 51)
      // .attr("dy", (ySpan - 100));

      // d3.select("svg")
      //   .selectAll("g.box")
      //   .data(this.info)
      //   .enter()
      //   .attr("class", "box")
      //   .attr(
      //     "transform",
      //     function(d, i) {"translate(" + xSc(i * 50) + "," + ySc(d.high) + ")"}
      //   )
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