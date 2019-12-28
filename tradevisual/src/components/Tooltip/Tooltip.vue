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
    <div class="tooltip-icon-wrapper" @mouseenter="tooltipHover" @mouseleave="tooltipHover"></div>
    <div v-if="showTooltip" class="tooltip">{{content}}</div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "Tooltip",
  data: () => {
    return {
      showTooltip: false
    };
  },
  props: {
    content: String,
    position: String,
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
    console.log(this.content);
    d3.select(".tooltip-icon-wrapper")
      .append("svg")
      .attr("class", "tooltip-svg")
      .style("height", "20px")
      .style("width", "20px");
    // add group element
    d3.select("svg").append("g");
    // create circle in group element
    d3.select("g")
      .append("circle")
      .attr("r", 9)
      .attr("cx", 10)
      .attr("cy", 10)
      .style("stroke", "cornflowerblue")
      .style("fill", "cornflowerblue");
    // create text in group element
    d3.select("g")
      .append("text")
      .attr("dx", 8)
      .attr("dy", 15)
      .attr("font-family", "Avenir, Helvetica, Arial, sans-serif")
      .style("stroke", "seashell")
      .style("fill", "seashell")
      .text("i");
  }
};
</script>
<style scoped>
@import "./Tooltip.scss";
</style>