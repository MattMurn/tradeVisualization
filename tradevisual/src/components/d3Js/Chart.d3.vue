<template>
  <div class="chart">
    <h1>Chart Info</h1>
    <!-- <div v-if="chartShow" class="company-content">
    </div>-->
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
      chartShow: true
    };
  },
  methods: {
    chartClick: function() {
      this.chartShow = !this.chartShow;
    }
  },
  mounted() {
    let svgHeight = 200;
    let svgWidth = 300;
    let yScale = d3.scaleLinear().domain([0, svgHeight]).range([0,10]);
    d3.select(".chart")
      .append("svg")
      .style("height", `${svgHeight}px`)
      .style("width", `${svgWidth}px`)
      .style('fill', 'pink')

    d3.select("svg")
      .selectAll("rect")
      .data(this.info)
      .enter()
      .append("rect")
      .attr("width", 10)
      .attr("height", d => yScale(Math.abs(d.change) * 1000))
      .attr("fill", "black")
      .style("stroke", "#9A8B7A")
      .style("stroke-width", "2px")
      .style('opacity', .25)
      .attr('x', (d,i)=> i * 10)
      .attr('y', d => 400 - yScale(Math.abs(d.change)* 1000))
  },
  updated() {
    console.log('updated hit');
    // Overwriting base render method with actual data
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
  height: 300px;
  /* background: pink; */
}
</style>
