<template>
  <div class="chart">
    <h1 v-on:click="chartClick()">Chart Info</h1>
    <svg :height="this.height" :width="this.width"/>
    <div v-if="chartShow" class="company-content">
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: "D3Chart",
  props: {
    info: Array
  },
  data: () => {
    return {
      datacollection: null,
      chartInfo: null,
      chartShow: false,
      height:600,
      width: 600,
    };
  },
  methods: {
    chartClick: function() {
      console.log("chart clicked");
      this.chartShow = !this.chartShow;
    },
  },
  mounted() {
    // Overwriting base render method with actual data.
    console.log('hello from the d3 Chart')
    console.log(this.info);
  },
  created() {
    this.colorScale = d3
    .scaleOrdinal()
    .range(["#f649000","#F800000", "#000000"])
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
