<template>
  <div id="app">
    <div class="header-container">
      <h1 class="app-title">Equity Monitor</h1>
      <SearchBar @handleSymbolSubmit="handleSubmit" />
    </div>
    <div class="body-container">
      <div class="current-company-contianer">
        <h1 class="cur-company">{{this.curCompany}} <span :class="(this.curCompanyChange > 0) ? 'company-change percent--positive': 'company-change percent--negative'">{{this.curCompanyChange}}%</span></h1>
      </div>
      <div class="flex-data-wrapper">
        <div class="data-side-nav">
          <Leaders
            id="volume"
            title="Active"
            @handleActiveSubmit="handleActiveSubmit"
            :info="this.mostActiveData"
          />
          <Leaders
            id="changePercent"
            title="Winners"
            @handleActiveSubmit="handleActiveSubmit"
            :info="this.gainersData"
          />
          <Leaders
            id="changePercent"
            title="Losers"
            @handleActiveSubmit="handleActiveSubmit"
            :info="this.losersData"
          />
        </div>
        <div class="data-body">
          <div class="data-chart">
            <!-- <D3Chart :info="this.chartData"/> -->
            <AreaChart d3Id="areaChart" @handleChartUpdate="updateAreaChart" :info="this.chartData" :height="300" :width="600" />
            <!-- <Histogram d3Id="histogram" :info="this.chartData" :height="400"/> -->
          </div>
          <div class="app-qual-data" v-if="this.curCompany">
            <Snapshot :info="this.snapshotData" />
            <CompanyInfo :info="this.companyData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
active/winners/losers on side nav,
and chart and snapshot/company info main
remove grid/change to 1 column with all 10.
*/
import Leaders from "./components/Leaders/Leaders.vue";
import CompanyInfo from "./components/CompanyInfo/CompanyInfo.vue";
import AreaChart from "./components/Charts/AreaChart/AreaChart.vue";
import SearchBar from "./components/SearchBar/SearchBar.vue";
import Snapshot from "./components/Snapshot/Snapshot.vue";
import {
  getChartData,
  getSnapshotData,
  getCompanyInfo,
  getIndexLeaders /*getSectorData*/
} from "./routes.js";
export default {
  name: "app",
  components: {
    Leaders,
    AreaChart,
    CompanyInfo,
    SearchBar,
    Snapshot
  },
  data: () => {
    return {
      symbol: "",
      curCompany: "",
      curCompanyChange: "",
      mostActiveData: [],
      gainersData: [],
      losersData: [],
      iexVolumeData: [],
      iexPercentData: [],
      companyData: [],
      snapshotData: [],
      chartData: [],
      defaultSymbols: ["SPY", "F", "BAC", "PTON", "TSLA", "UCO"]
    };
  },
  methods: {
    handleSubmit: function(symbol) {
      getCompanyInfo(symbol).then(data => {
        if (!data) return;
        this.companyData = data.data;
        this.curCompany = data.data.companyName;
      });
      getChartData(symbol).then(data => {
        this.chartData = data.data;
      });
      getSnapshotData(symbol).then(data => {
        this.snapshotData = data.data;
        this.curCompanyChange = (this.snapshotData.changePercent *100).toFixed(2);
      });
    },
    handleActiveSubmit: function(activeData) {
      if(this.symbol === activeData.symbol) return;        
      
      this.symbol = activeData.symbol;
      getCompanyInfo(activeData.symbol).then(data => {
        this.companyData = data.data;
        this.curCompany = data.data.companyName;
      });
      getChartData(activeData.symbol).then(data => {
        this.chartData = data.data;
      });
      this.snapshotData = activeData;
      this.curCompanyChange = (this.snapshotData.changePercent *100).toFixed(2);

    },
    updateAreaChart: function(range) {
      getChartData(this.symbol, range).then(data => {
        this.chartData = data.data;
      })
    }
  },
  mounted() {
    // create a local storage function to check the time on these.
    getIndexLeaders("mostActive").then(data => {
      if (!data) return;
      this.mostActiveData = data.data;
    });
    getIndexLeaders("gainers").then(data => {
      if (!data) return;
      this.gainersData = data.data;
    });
    getIndexLeaders("losers").then(data => {
      if (!data) return;
      this.losersData = data.data;
    });
    let randomIndex = Math.floor(Math.random() * Math.floor(this.defaultSymbols.length-1));
    this.handleSubmit(this.defaultSymbols[randomIndex]);
  }
};
</script>
<style scoped>
@import "./App.scss";
</style>
