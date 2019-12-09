<template>
  <div>
    <div class="chart">
      <div v-if="chartShow" class="company-content"></div>
    </div>
    <div class="chart-btns"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "D3Chart",
  props: {
    info: Array
  },
  data: () => {
    return {
      datacollection: null,
      chartInfo: null,
      chartShow: true,
      svgHeight: 300,
      svgWidth: 800
    };
  },
  watch: {
    immediate: true,
    info: function() {
      // return this.initLine();
      return this.initCircle();
    }
  },
  methods: {
    initChart: function() {
      let yScale = d3
        .scaleLinear()
        .domain([0, this.svgHeight])
        .range([0, 30]); // allows us to map the values in a way suitable for display.
      d3.select("svg").remove();

      d3.select(".chart")
        .append("svg")
        .style("height", `${this.svgHeight}px`)
        .style("width", `${this.svgWidth}px`)
        .style("fill", "#000")
        .style("background", "cornflowerblue");

      d3.select("svg")
        .selectAll("rect")
        .data(this.info)
        .enter()
        .append("rect")
        .attr("width", 10)
        .attr("height", d => yScale(Math.abs(d.change) * 100))
        .attr("fill", "black")
        .style("stroke", "#9A8B7A")
        .style("stroke-width", "2px")
        .style("opacity", 0.25)
        .attr("x", (d, i) => i * 10)
        .attr("y", d => this.svgHeight - yScale(Math.abs(d.change) * 100));
    },
    initLine: function() {
      let styles = {
        fill: "pink",
        height: "300px",
        width: "700px",
        background: "#ccc"
      };
      d3.select(".chart")
        .append("svg")
        .style(styles);
    },
    initCircle: function() {
      let color = "#fff";
      d3.select("svg").remove();
      d3.select(".chart")
        .append("svg")
        .style("height", `100%`)
        .style("width", `100%`)
        .style("fill", color)
        .style("background", "cornflowerblue");
      let xRange = d3.extent(this.info.map(d => Math.abs(d.change) * 100));
      let yRange = d3.extent(this.info.map(d => Math.abs(d.volume) / 100));
      let xScale = d3
        .scaleLinear()
        .domain(xRange)
        .range([-100, 100]);
      let yScale = d3
        .scaleLinear()
        .domain(yRange)
        .range([-100, 100]);
        let chartLine = d3
        .line()
        .x(d => xScale(d.change))
        .y(d => yScale(d.volume));
      d3.select("svg")
        .append("g")
        .attr("id", "data-pt")
        .attr("transform", "translate(50, 300)")
        .selectAll("g")
        .data(this.info)
        .enter()
        .append("g")
        .attr("class", "data")
        .attr("cx", d => xScale(d.change))
        .attr("cy", d => yScale(d.volume))
        .transition()
        .delay((d, i) => i * 100)
        .attr(
          "transform",
          (d, i) => `translate(${i * 50},-${250 - d.change * 10})`
        )

        d3.line().defined(d => d.y !== null)

        d3.selectAll('svg').append("path")
        .attr("d", chartLine(this.info))
        .attr("fill", "pink")
        .attr("stroke", "#fe9a22")
        .attr("stroke-width", 10)
      let instanceG = d3.selectAll("g.data");
      instanceG.append("circle").attr("r", 10);
      instanceG
        .append("text")
        .attr("y", (d, i) => (i % 2 === 0 ? -20 : 20))
        .text(d => d.date);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
h1 {
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: cornflowerblue;
}
.chart {
  width: 100%;
  height: 400px;
}
.d3-btn {
  background: blue;
}
</style>
