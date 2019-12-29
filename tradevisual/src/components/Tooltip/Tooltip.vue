/*

what this component does:
  is shown to the user evertime an icon is hovered on desktop/ active on mobile.
  should take in the content of tooltip
note about positioning:
  in order to position tooltip properly, the wrapper is absolute and takes in props for
  TRBL styles, and wil default to initial
*/
<template>
  <div class="tooltip-wrapper" :style="style">
    <div class="tooltip-icon-wrapper" :id="id" @mouseenter="tooltipHover" @mouseleave="tooltipHover"></div>
    <div v-if="showTooltip" class="tooltip">{{tooltipText.default[id]}}</div>
  </div>
</template>
<script>
import * as d3 from "d3";
import * as tooltipText from '../../../tooltipText.json';
export default {
  name: "Tooltip",
  data: () => {
    return {
      showTooltip: false,
      tooltipText: tooltipText
    };
  },
  props: {
    position: String,
    id: String,
    top: {
      type: String,
      default: "initial"
    },
    right: {
      type: String,
      default: "initial"
    },
    bottom: {
      type: String,
      default: "initial"
    },
    left: {
      type: String,
      default: "initial"
    }
  },
  computed: {
    style: function() {
      return `top: ${this.top}; right: ${this.right}; bottom: ${this.bottom}; left: ${this.left}`;
    }
  },
  methods: {
    tooltipHover: function() {
      this.showTooltip = !this.showTooltip;
    }
  },
  mounted: function() {
    // create svg
    d3.select(`#${this.id}`)
      .append("svg")
      .attr("class", "tooltip-svg")
      .attr("id", `${this.id}-svg`)
      .style("height", "20px")
      .style("width", "20px");
    // add group element
    d3.select(`#${this.id}-svg`)
    .append("g")
      .attr("id", `${this.id}-group`)
    // create circle in group element
    d3.select(`#${this.id}-group`)
      .append("circle")
      .attr("r", 5)
      .attr("cx", 10)
      .attr("cy", 10)
      .style("stroke", "cornflowerblue")
      .style("fill", "cornflowerblue");
    // create text in group element
    d3.select(`#${this.id}-group`)
      .append("text")
      .attr("dx", 9)
      .attr("dy", 13)
      .attr("font-family", "Avenir, Helvetica, Arial, sans-serif")
      .style("stroke", "seashell")
      .style("fill", "seashell")
      .style("font-size", "8px")
      .text("i");
  }
};
</script>
<style scoped>
@import "./Tooltip.scss";
</style>