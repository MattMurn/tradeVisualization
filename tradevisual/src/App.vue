<template>
  <div id="app">
    <div class="header-container">
      <h1 class="app-title">Equity Monitor</h1>
      <SearchBar @handleSymbolSubmit="handleSubmit" />
    </div>
    <div class="body-container">
      <h1 class="cur-company">{{this.curCompany}}</h1>
      <div class="flex-data-wrapper">
        <div class="data-side-nav">
          <Leaders
            id="active"
            title="Active"
            @handleActiveSubmit="handleActiveSubmit"
            :info="this.mostActiveData"
          />
          <Leaders
            id="winners"
            title="Winners"
            @handleActiveSubmit="handleActiveSubmit"
            :info="this.gainersData"
          />
          <Leaders
            id="losers"
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
          <div class="app-qual-data">
            <CompanyInfo :info="this.companyData" />
            <Snapshot :info="this.snapshotData" />
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
      mostActiveData: [],
      gainersData: [],
      losersData: [],
      iexVolumeData: [],
      iexPercentData: [],
      companyData: [],
      snapshotData: [],
      chartData: []
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
      });
    },
    handleActiveSubmit: function(activeData) {
      this.symbol = activeData.symbol;
      getCompanyInfo(activeData.symbol).then(data => {
        this.companyData = data.data;
        this.curCompany = data.data.companyName;
      });
      getChartData("1m", activeData.symbol).then(data => {
        this.chartData = data.data;
      });
      this.snapshotData = activeData;
    },
    updateAreaChart: function(range) {
      getChartData(range, this.symbol).then(data => {
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
    // getSectorData().then(data => {
    //   console.log(data);
    // })
  }
};
</script>
<style scoped>
@import "./App.scss";
</style>
