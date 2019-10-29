<template>
  <div class="snapshot-info">
    <h1 v-on:click="snapshotClick()">Market Snapshot</h1>
    <div v-if="snapshotShow" class="snapshot-content">
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">Open :</span>
        ${{info.open}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">Close :</span>
        ${{info.close}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">High :</span>
        ${{info.high}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">Low :</span>
        ${{info.low}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">Latest Price :</span>
        ${{info.latestPrice}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">Change($) :</span>
        ${{info.change}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">Change(%) :</span>
        {{(info.changePercent)*100}}%
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">Volume :</span>
        {{info.volume}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">Average Volume :</span>
        {{info.avgTotalVolume}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">52-week High :</span>
        ${{info.week52High}}
      </div>
      <div class="snapshot-content-wrapper">
        <span class="snapshot-content-category">52-week Low :</span>
        ${{info.week52Low}}
      </div>
      <div class="snapshot-content-wrapper snapshot-on-the-fly">
        <span class="snapshot-content-category">52-week mid :</span>
        ${{this.midPoint}}
      </div>
      <div class="snapshot-content-wrapper snapshot-on-the-fly">
        <span class="snapshot-content-category">% off High :</span>
        {{this.fromHigh}}
      </div>
      <div class="snapshot-content-wrapper snapshot-on-the-fly">
        <span class="snapshot-content-category">% off Low :</span>
        {{this.fromLow}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Snapshot",
  data: () => {
    return {
      snapshotShow: false,
      midPoint: "",
      fromHigh: "",
      fromLow: ""
    };
  },
  props: {
    info: Object
  },
  methods: {
    snapshotClick: function() {
      this.snapshotShow = !this.snapshotShow;
    },
    calcMid: function() {
      if (this.info.week52High && this.info.week52Low) {
        this.midPoint = ((this.info.week52High + this.info.week52Low) / 2).toFixed(2);
      }
    },
    calcFrom: function() {
      let high = this.info.week52High;
      let low = this.info.week52Low;
      let latest = this.info.latestPrice;
      this.fromHigh = (((high - latest) / high) * 100).toFixed(2);
      this.fromLow = (((latest - low) / low) * 100).toFixed(2);

    }
  },
  beforeUpdate() {
    // console.log(this.info);
    if (!this.info) return;
    this.calcMid();
    this.calcFrom();
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-size: 28px;
}
.snapshot-content-category {
  font-size: 20px;
  font-weight: 600;
}
.snapshot-on-the-fly {
  color: cornflowerblue;
  font-weight: 200;
}
</style>
