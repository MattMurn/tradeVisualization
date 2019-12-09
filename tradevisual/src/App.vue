<template>
  <div id="app">
    <div class="header-container">
    <h1 class="app-title">IEX Equity Monitor</h1>
    <SearchBar v-on:handleTickerSubmit="handleSubmit"/>
    <h1 class="cur-company">{{this.curCompany}}</h1>
    </div>
    <div class="data-chart">
      <!-- <D3Chart :info="this.chartData"/> -->
    </div>
    <div class="flex-data-wrapper">
    <!-- <div class="data-side-nav"> -->
      <Leaders title="Active" v-on:handleActiveSubmit="handleActiveSubmit" :info="this.mostActiveData" />
      <Leaders title="Winners" v-on:handleActiveSubmit="handleActiveSubmit" :info="this.gainersData" />
      <Leaders title="Losers" v-on:handleActiveSubmit="handleActiveSubmit" :info="this.losersData" />
    <!-- </div> -->
    <div class="data-body">
    <div class="app-qual-data">
      <CompanyInfo :info="this.companyData" />
      <Snapshot :info="this.snapshotData" />
    </div>
    </div>
  </div>
    </div>
</template>

<script>
import Leaders from "./components/Leaders.vue";
// import CompanyInfo from "./components/CompanyInfo.vue";
// import D3Chart from "./components/d3Js/Chart.d3";
import SearchBar from "./components/SearchBar.vue";
// import Snapshot from "./components/Snapshot.vue";
import { getChartData, getSnapshotData, getCompanyInfo, getIndexLeaders } from "./routes.js";
export default {
  name: "app",
  components: {
    Leaders,
    // CompanyInfo,
    // D3Chart,
    SearchBar,
    // Snapshot
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
      // this.submitResponse = response;
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
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

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
  flex-basis: 30%;
  flex-direction: column;
}

</style>
