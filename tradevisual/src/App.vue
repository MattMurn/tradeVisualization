<template>
  <div id="app">
    <div class="header-container">
    <h1 class="app-title">IEX Equity Monitor</h1>
    <SearchBar @handleTickerSubmit="handleSubmit"/>
    </div>
    <h1 class="cur-company">{{this.curCompany}}</h1>
    <div class="flex-data-wrapper">
    <div class="data-side-nav">
      <Leaders id="active" title="Active" @handleActiveSubmit="handleActiveSubmit" :info="this.mostActiveData" />
      <Leaders id="winners" title="Winners" @handleActiveSubmit="handleActiveSubmit" :info="this.gainersData" />
      <Leaders id="losers" title="Losers" @handleActiveSubmit="handleActiveSubmit" :info="this.losersData" />
    </div>
    <div class="data-body">
    <div class="data-chart">
      <!-- <D3Chart :info="this.chartData"/> -->
      <LineChart d3Id="lineChart" :info="this.chartData" :height="400"/>
      <!-- <Histogram d3Id="histogram" :info="this.chartData" :height="400"/> -->
    </div>
    <div class="app-qual-data">
      <CompanyInfo :info="this.companyData" />
      <Snapshot :info="this.snapshotData" />
      <Pie :info="this.chartData"/>
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
import LineChart from "./components/Charts/LineChart.vue";
import Pie from "./components/Charts/Pie.vue";
// import Histogram from "./components/Charts/Histogram.vue";
import SearchBar from "./components/SearchBar/SearchBar.vue";
import Snapshot from "./components/Snapshot/Snapshot.vue";
import { getChartData, getSnapshotData, getCompanyInfo, getIndexLeaders, /*getSectorData*/ } from "./routes.js";
export default {
  name: "app",
  components: {
    Leaders,
    LineChart,
    // Histogram,
    Pie,
    CompanyInfo,
    SearchBar,
    Snapshot
  },
  data: () => {
    return {
      ticker: "",
      curCompany: "",
      mostActiveData: [],
      gainersData: [],
      losersData: [],
      iexVolumeData: [],
      iexPercentData: [],
      companyData: [],
      snapshotData: [],
      chartData: [],
    };
  },
  methods: {
    handleSubmit: function(ticker) {
      getCompanyInfo(ticker).then(data => {
        if(!data) return;
        this.companyData = data.data;
        this.curCompany = data.data.companyName;

      });
      getChartData(ticker).then(data => {
        this.chartData = data.data;
      })
      getSnapshotData(ticker).then(data => {
        this.snapshotData = data.data;
      });
    },
    handleActiveSubmit: function(activeData) {
      getCompanyInfo(activeData.symbol).then(data => {
        this.companyData = data.data;
        this.curCompany = data.data.companyName;
      });
      getChartData(activeData.symbol).then(data => {
        this.chartData = data.data;
      })
      this.snapshotData = activeData;
    }
  },
  mounted() {
    // create a local storage function to check the time on these.
    getIndexLeaders("mostActive").then(data => {
        if(!data) return;
        this.mostActiveData = data.data;
    });
    getIndexLeaders("gainers").then(data => {
        if(!data) return;
        this.gainersData = data.data;
    });
    getIndexLeaders("losers").then(data => {
        if(!data) return;
        this.losersData = data.data;
    });
    // getSectorData().then(data => {
    //   console.log(data);
    // })
  },
};
</script>

<style>
body {
  background: seashell
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.header-container {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
}
.cur-company {
  height: 60px;
  margin: 20px 0;
}
.flex-data-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.app-title {
  display: flex;
  text-align: left;
  font-size: 34px;
  font-weight: bold;
}
.data-body {
  flex-basis: 70%;
  flex-direction: column;
}
.app-qual-data {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.data-side-nav {
  display: flex;
  min-width: 350px;
  /* flex-basis: 30%; */
  flex-direction: column;
}
  @media screen and (max-width: 992px) {
    .data-body {
      order: 1;
      flex-basis: 90%;
    }
    .data-side-nav {
      order: 2;
    }
    .app-qual-data {
      flex-wrap: wrap;
    }
  }
</style>
