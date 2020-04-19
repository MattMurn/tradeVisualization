<template>
  <div :id="this.id">{{this.targetAttribute}}</div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "Treemap",
  props: {
    info: Array,
    targetAttribute: String,
    treemapDataLoaded: Boolean,
    id: String
  },
  data: function() {
    return {
      svg: null,
      width: 310,
      height: 350
    };
  },
  methods: {
    initTreemap: function() {
      console.log(this.info);
      let margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = this.width - margin.left - margin.right,
        height = this.height - margin.top - margin.bottom;

      this.svg = d3
        .select(`#${this.id}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.updateTreemap();
    },
    updateTreemap: function() {

       // stratify the data: reformatting for d3.js
    let root = d3.stratify()
      .id(d => d[this.targetAttribute])
      .parentId( d => d.parent);

    root(this.info);
  
    root.sum( d => +d[this.targetAttribute])

    d3.treemap()
    .size([this.width, this.height])
    .padding(4)(root)
    }
  },
  watch: {
    info: function() {
      if (!this.info) return;
      if (this.treemapDataLoaded) {
        this.updateTreemap();
      } else {
        // this.initTreemap();
      }
    }
  }
};
</script>
<style scoped>
@import "./Treemap.scss";
</style>