<template>
  <div class="area-wrapper" id="area-wrapper-id">
    <div class="area-hover-wrapper">
      <div class="area-hover-data-wrapper" v-if="this.chartDataLoaded">
        <div class="area-hover-data">
          <span>session:</span>
          <span>{{this.date}}</span>
        </div>
        <div class="area-hover-data">
          <span>$:</span>
          <span>{{this.price}}</span>
        </div>
        <div class="area-hover-data">
          <span>%:</span>
          <span>{{this.perChange}}</span>
        </div>
      </div>
    </div>
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
      svgWidth: null,
      xScale: null,
      yScale: null,
      focus: null,
      focusText: null,
      dateTicks: null,
      margin: {},
      chartDataLoaded: false,
      price: null,
      date: null,
      perChange: null
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
      this.svgWidth = this.width + margin.left + margin.right;
      this.svg = d3
        .select(".area-svg-wrapper")
        .append("svg")
        .attr("class", "area-svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.xScale = d3
        .scaleTime()
        .domain(d3.extent(this.info, d => d3.timeParse("%Y-%m-%d")(d.date)))
        .range([0, this.svgWidth]);

      this.yScale = d3
        .scaleLinear()
        .domain([d3.max(this.info, d => d.close), 0])
        .range([0, this.svgHeight]);

      this.focus = this.svg
        .append("g")
        .append("circle")
        .style("fill", "none")
        .attr("stroke", "black")
        .attr("r", 8.5)
        .style("opacity", 0);

      this.updateAreaChart();
    },
    updateAreaChart: function() {
      let transition = d3.transition().duration(750);
      let areaBisect = d3.bisector(d => d.date).left;
      let self = this;
      // update domains
      this.xScale.domain(
        d3.extent(this.info, d => d3.timeParse("%Y-%m-%d")(d.date))
      );

      this.yScale.domain([d3.max(this.info, d => d.close), 0]);
      // add focus
      this.svg
        .append("rect")
        .style("fill", "none")
        .style("pointer-events", "all")
        .style("z-index", 1000)
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight)
        .on("mousemove", function() {
          // need to format date after getting value
          let x1 = d3.timeFormat("%Y-%m-%d")(
            self.xScale.invert(d3.mouse(this)[0])
          );
          // this is basically grabbing the reverse of the x axis value. Update with d3.timeParse method.
          let i = areaBisect(self.info, x1);
          let selectedData = self.info[i];

          self.focus
            .attr("x", self.xScale(selectedData.date))
            .attr("y0", self.yScale(selectedData.close))
            .attr("y1", 0);

          self.setFocusText(selectedData);
        })
        .on("mouseout", self.removeFocusText());

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
            .y(0)
        )
        .remove();

      this.svg.selectAll("path").remove();

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
    },
    setFocusText(day) {
      this.date = day.date;
      this.price = day.close;
      this.perChange = day.changePercent;
    },
    removeFocusText() {
      this.date = null;
      this.price = null;
      this.perChange = null;
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
@import "./AreaChart.scss";
</style>