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
      width: 0,
      xSc: null,
      ySc: null,
      svg: null,
      dateTicks: null
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
      // basic styles.
      let chartPadding = 20;
      let margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const ySpan = d3.extent(this.info.map(point => point.close));
      // format dates -- remove year
      this.dateTicks = this.info.map(point => {
        return point.date
          .split("-")
          .slice(1)
          .join("-");
      });
      // create scale for x axis
      this.xSc = d3
        .scaleBand()
        .domain(this.dateTicks)
        .range([50, this.width]);
      // create scale for y axis
      this.ySc = d3
        .scaleLinear()
        .domain(ySpan)
        .range([this.height - chartPadding, 0]);
      // add svg to the parent by grabbing class.
      this.svg = d3
        .select(".line-svg-wrapper")
        .append("svg")
        .attr("id", `${this.d3Id}-svg`)
        .style("height", this.height + margin.bottom + margin.top)
        .style("width", this.width + margin.left + margin.right);
    },
    initLineChart: function() {
      // create chart container.
      this.destroyChart();
      this.initChartContainer();

      let parentGroup = d3
        .select(`#${this.d3Id}-svg`)
        .attr("id", `#${this.d3Id}-g`);

      // //build x&y axis
      var yAxis = d3.axisLeft().scale(this.ySc);

      this.svg
        .append("g")
        .attr("id", "yAxisG")
        .style("color", "cornflowerblue")
        .style("font-weight", 600)
        .attr("transform", "translate(20,0)") //0,0 is top left.
        .call(yAxis);

      var xAxis = d3
        .axisBottom()
        .scale(this.xSc)
        .tickValues(this.dateTicks);

      this.svg
        .append("g")
        .attr("id", "xAxisG")
        .style("color", "cornflowerblue")
        .style("font-weight", 600)
        .attr("transform", `translate(0,${this.height - 5})`)
        .call(xAxis);

      // add plot points to chart.
      this.svg
        .selectAll("circle")
        .data(this.info)
        .enter()
        .append("circle")
        .attr("r", 1)
        .attr("cx", d => this.xSc(d.date)) // buffer for border - TODO fix this.
        .attr("cy", d => this.ySc(d.close) + 10) // buffer for border
        .style("fill", "cornflowerblue");

      // create line paths -- needs to be same as plot points
      var trendLine = d3
        .line()
        .x((d, i) => this.xSc(this.dateTicks[i]))
        .y(d => this.ySc(d.close) + 10);

      this.svg
        .append("path")
        .attr("d", trendLine(this.info))
        .attr("fill", "none")
        .attr("stroke", "cornflowerblue")
        .attr("stroke-width", 2);

      // create hover functionality for line chart
      let focus = parentGroup.append("g");

      focus.attr("id", "focus").style("display", "none");
      focus
        .append("line")
        .attr("class", "x-hover")
        .attr("y1", 0)
        .attr("y2", this.height);
      focus
        .append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", this.width)
        .attr("x2", this.width);

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
      //   .attr("y", d => this.ySc(d.close) + 10) // buffer for border
      //   .attr("width", d => xSc(d.x1 - d.x0) - 2)
      //   .attr("height", d => 400 - this.ySc(d.length))
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