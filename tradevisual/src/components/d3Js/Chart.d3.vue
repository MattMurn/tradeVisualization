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
  watch: {
    immediate: true,
    info: function(){
      return this.initChart();
    }
  },
  methods: {
    initChart: function() {
              console.log('chart init', this.info)
    let svgHeight = 300;
    let svgWidth = 800;
    let yScale = d3.scaleLinear().domain([0, svgHeight]).range([0,10]);
    d3.select('svg')
      .remove();

    d3.select(".chart")
      .append("svg")
      .style("height", `${svgHeight}px`)
      .style("width", `${svgWidth}px`)
      .style('fill', 'pink')
      .style('background', 'cornflowerblue')

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
    }
  },
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
  height: 400px;
  border: 1px solid cornflowerblue;
  background: pink;
}
</style>
