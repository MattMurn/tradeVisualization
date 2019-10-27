<template>
  <div class="snapshot-info">
    <h1 v-on:click="snapshotClick()">Market Snapshot</h1>
    <div v-if="snapshotShow" class="snapshot-content">
      <div>
        <span class="company-content-category">Open -</span>
        ${{info.open}}
      </div>
      <div>
        <span class="company-content-category">Close -</span>
        ${{info.close}}
      </div>
      <div>
        <span class="company-content-category">High -</span>
        ${{info.high}}
      </div>
      <div>
        <span class="company-content-category">Low -</span>
        ${{info.low}}
      </div>
      <div>
        <span class="company-content-category">Latest Price -</span>
        ${{info.latestPrice}}
      </div>
      <div>
        <span class="company-content-category">Change($) -</span>
        ${{info.change}}
      </div>
      <div>
        <span class="company-content-category">Change(%) -</span>
        {{(info.changePercent)*100}}%
      </div>
      <div>
        <span class="company-content-category">Volume -</span>
        {{info.volume}}
      </div>
      <div>
        <span class="company-content-category">Average Volume -</span>
        {{info.avgTotalVolume}}
      </div>
      <div>
        <span class="company-content-category">52-week High -</span>
        ${{info.week52High}}
      </div>
      <div>
        <span class="company-content-category">52-week Low -</span>
        ${{info.week52Low}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Snapshot",
  data: () => {
    return {
      snapshotShow: false
    };
  },
  props: {
    info: Object
  },
  methods: {
    snapshotClick: function() {
      this.snapshotShow = !this.snapshotShow;
    }
  },
  mounted() {
    console.log("snapshotInfo mounted");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
h1 {
  cursor: pointer;
}
.snapshot-info {
  flex-basis: 50%;
}
.snapshot-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.snapshot-content-category {
  font-size: 20px;
  font-weight: 600;
}
</style>
