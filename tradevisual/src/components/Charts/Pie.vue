<template>
  <div>
    <div class="chart">
      <div v-if="chartShow" class="company-content"></div>
    </div>
    <div id="pie-chart-container"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "Pie",
  props: {
    info: Array
  },
  methods: {
    initPieChart: function() {
      // set background & svg size
      let svgId = "pie-chart-svg";

       d3
        .select("#pie-chart-container")
        .append("svg")
        .attr("id", svgId)
        .attr("height", "400px")
        .attr("width", "400px");

      let pieChart = d3.pie();
      let pieData = pieChart([1, 23, 45, 2, 123, 4, 7, 74]);

      var newArc = d3.arc();
      newArc.innerRadius(0).outerRadius(100);
      console.log(newArc(pieData[0]));

      let pieFillColors = d3
        .scaleOrdinal()
        .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#fcd88a", "#cf7c1c", "#93c464", "#75734F"]);

      d3.select(`#${svgId}`)
        .append("g")
        .attr("transform", "translate(100, 100)")
        .selectAll("path")
        .data(pieData)
        .enter()
        .append("path")
        .attr("d", newArc)
        .style("fill", (d, i) => pieFillColors(i))
        .style("stroke", "black")
        .style("stroke-width", "2px");
    }
  },
  mounted: function() {
    this.initPieChart();
  }
};
</script>
<style scoped>
</style>