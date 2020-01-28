<template>
  <div class="line-wrapper" id="line-wrapper-id">
    <!-- <button @click="toggleChartType">{{chartType}}</button> -->
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
      dateTicks: null,
      chartType: "Histogram"
    };
  },
  props: {
    info: Array,
    height: Number,
    d3Id: String
  },
  methods: {
    toggleChartType: function() {
      if (this.chartType === "Line") {
        this.chartType = "Histogram";
      } else if (this.chartType === "Histogram") {
        this.chartType = "Line";
      }
    },
    destroyChart: function() {
      this.svg = null;
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

      let parentGroup = d3.select(`#${this.d3Id}-svg`);

      // //build x&y axis
      let yAxis = d3.axisLeft().scale(this.ySc);

      this.svg
        .append("g")
        .attr("id", "yAxisG")
        .style("color", "cornflowerblue")
        .style("font-weight", 600)
        .attr("transform", "translate(20,0)") //0,0 is top left.
        .call(yAxis);

      let xAxis = d3
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
      let trendLine = d3
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
      let focus = parentGroup.append("g").attr("id", `${this.d3Id}-g`);

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
      // create a histogram chart using the same initial chart container that is being used by the line chart.
      // this.destroyChart();
      this.initChartContainer();
      let histo = d3.histogram();
      histo
        .domain([0, 5])
        .thresholds(this.xSc.domain())
        .value(d => d.close);
      console.log(this.info);
      let histoData = histo(this.info);
      console.log(histoData);
      d3.select(`#${this.d3Id}-svg`)
        .selectAll("rect")
        .data(histoData)
        .enter()
        .append("rect")
        // .attr("x", 10)
        // .attr("y", 10)
        // .attr("width", 50)
        // .attr("height", 100)
        .attr("x", (d, i) =>  i*10)
        .attr("y", (d,i) => i*10)
        .attr("width", 100)
        .attr("height", (d,i) => i* 10)
        .style("fill", "#FCD88B");
      d3.select(`#${this.d3Id}-svg`)
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,40)")
        .call(this.xSc);
      d3.select("g.axis")
        .selectAll("text")
        .attr("dx", 50);


//  var xScale = d3.scaleLinear().domain([ 0, 5 ]).range([ 0, 500 ]);
//   //  var yScale = d3.scaleLinear().domain([ 0, 10 ]).range([ 400, 0 ]);
//    var xAxis = d3.axisBottom().scale(xScale).ticks(5)
//    var histoChart = d3.histogram();

//    histoChart
//     .domain([ 0, 5 ])
//     .thresholds(this.xSc.domain())
//     .value(d => d.high)

// let histoData = histoChart(this.info);
//   console.log(histoData);
//   d3.select(`lineChart--svg`)
//     .append("rect")
//     .attr("x", 100)
//     .attr("y", 100)
//     .attr("width", 100)
//     .attr("height", 100)
//       // .data(histoData).enter()
//       // .append("rect")
//       // .attr("x", d => xScale(d.x0))
//       // .attr("y", d => yScale(d.length))
//       // .attr("width", d => xScale(d.x1 - d.x0) - 2)
//       // .attr("height", d => 400 - yScale(d.length))
//     .style("fill", "#FCD88B")

//   d3.select(`${this.d3Id}--svg`).append("g").attr("class", "x axis")
//     .attr("transform", "translate(0,400)").call(xAxis);
//   d3.select("g.axis").selectAll("text").attr("dx", 50);

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
      // this.initLineChart();
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