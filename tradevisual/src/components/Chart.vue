<template>
  <div class="chart">
    <h1 v-on:click="chartClick()">Chart Info</h1>
    <div v-if="chartShow" class="company-content">
      <line-chart style="height: 500px; width: 800px; margin: 0;" :chart-data="datacollection"></line-chart>
    </div>
  </div>
</template>

<script>
// CommitChart.js
import LineChart from "./chart.js";
export default {
  components: {
    LineChart
  },
  props: {
    info: Object
  },
  name: "Chart",
  data: () => {
    return {
      datacollection: null,
      chartInfo: null,
      chartShow: false,
    };
  },
  methods: {
    chartClick: function() {
      console.log("chart clicked");
      this.chartShow = !this.chartShow;
    },
    createChart: function() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "pink",
            data: [[2,3,4,5,6,7,139], this.getRandomInt()]
          },
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  mounted() {
    // Overwriting base render method with actual data.
    let tempData = {
      labels: [],
      datasets: []
    }
    console.log(this.info);
    this.info.forEach(day => {
      // tempData.labels.push(day.label);
      tempData.datasets.push({
        label: day.label,
        backgroundColor: 'cornflowerblue',
        data: [day.close]
      })
    })
    this.datacollection = tempData;
    console.log(this.datacollection);
    // this.createChart();
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
  color: #42b983;
}
.chart {
  height: 300px;
  /* background: pink; */
}

</style>
