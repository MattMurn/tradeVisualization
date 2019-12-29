<template>
  <div class="index-leaders-wrapper">
    <div class="index-leaders-header">
    <h1 @click="leaderClick()">{{title}}</h1>
    <Tooltip :id="title" top="0" right="10px"/>
    </div>
    <div v-if="showInfo" class="index-leaders">
      <div
        @click="sendActive(info)"
        class="index-leaders-container"
        v-bind:key="info.symbol"
        v-for="info in info"
      >
        <span>{{info.symbol}}</span>
        <span v-if="title === 'Active'">{{(info.volume/1000000).toFixed(2)}}</span>
        <span v-else>${{info.latestPrice}}</span>
        <span>{{(info.changePercent *100).toFixed(2)}}%</span>
      </div>
    </div>
    <div class="index-leaders-chart" :id='`${id}`'></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import Tooltip from "../Tooltip/Tooltip.vue";
export default {
  name: "Leaders",
  components: {
    Tooltip
  },
  data: () => {
    return {
      showInfo: true,
      showChart: false,

    };
  },
  props: {
    info: Array,
    title: String,
    id: String
  },
  methods: {
    sendActive: function(symbol) {
      this.$emit("handleActiveSubmit", symbol);
    },
    destroyChart: function() {
      d3.select("svg").remove();
    },
    renderChart: function() {
      /*
      creating a chart shows the current change of each leader board.
      x axis is net change,
      y axis is current volume.
      circle size is their market cap.
      */
      let color = "#fff";
      let margin = { top: 10, right: 10, bottom: 10, left: 10 };
      // let volumeTicks = [1000, 750, 500, 250, 0];
      this.destroyChart();
      // create svg

      let targetSvg = d3
        .select(`#${this.id}`)
        .append("svg")
        .style("height", `100%`)
        .style("width", `100%`)
        .style("fill", color)
        .style("background", "cornflowerblue");
      // create scale - issues with marketCap
      let xScale = d3
        .scaleLinear()
        .domain([-1,1])
        .range([0, 400]);
      let yScale = d3
        .scaleLinear()
        .domain([1000000,100000])
        .range([0, 240]);

      let g = targetSvg
        .append("g")
        .attr("transform", "translate(" + margin.top + "," + margin.top + ")");

      g.selectAll('circle')
      .data(this.info)
      .enter()
      .append('circle')
      .attr('class', 'data-pt')
      .attr('r', d => {
        // determine radius on large, mid, small cap.
        if(d.marketCap > 5000000000) {
          return 15;
        }
        else if(d.marketCap < 5000000000 && d.marketCap > 1000000000){
          return 10;
        }
        else {
          return 5;
        }
      })
      .attr('cx', d => xScale(d.changePercent))
      .attr('cy', d => (d.volume) ? yScale(d.volume/ 10000) : xScale.range()[1]/2)
      .style('fill', d => (d.marketCap > 10000000000) ? 'pink' : '#ccc')

      g.selectAll('.data-pt')
      .append('text')
      .text(d => d.symbol)
      .attr('y', 200)

      g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + yScale.range()[1] / 2 + ")")
        .call(d3.axisBottom(xScale).ticks(4));

      g.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + xScale.range()[1] / 2 + ", 0)")
        .call(d3.axisLeft(yScale).ticks(4));


    },
    leaderClick: function() {
      this.showInfo = !this.showInfo;
      this.showChart = !this.showChart;
      if(this.showChart){
        this.renderChart();
      }
      else {
        this.destroyChart();
        this.showInfo = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './Leaders.scss';
</style>
