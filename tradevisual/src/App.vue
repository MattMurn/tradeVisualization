<template>
  <div id="app">
    <h1 class="appTitle">IEX Equity Monitor</h1>
    <SearchBar v-on:handleTickerSubmit="handleSubmit" />
    <H1>{{this.curCompany || "Enter a Stock Symbol"}}</H1>
    <div class="data-wrapper">
      <Active title="Active" v-on:handleActiveSubmit="handleActiveSubmit" :info="this.mostActiveData" />
      <Active title="Winners" v-on:handleActiveSubmit="handleActiveSubmit" :info="this.gainersData" />
      <Active title="Losers" v-on:handleActiveSubmit="handleActiveSubmit" :info="this.losersData" />
      <!-- <Active :title="Volume" v-on:handleActiveSubmit="handleActiveSubmit" :info="this.iexVolumeData" />
      <Active :title="Percent" v-on:handleActiveSubmit="handleActiveSubmit" :info="this.iexPercentData" /> -->
    </div>
      <!-- <Chart /> -->
    <div class="app-qual-data">
      <CompanyInfo :info="this.companyData" />
      <Snapshot :info="this.snapshotData" />
    </div>
  </div>
</template>

<script>
import Active from "./components/Active.vue";
// import Chart from "./components/Chart.vue";
import CompanyInfo from "./components/CompanyInfo.vue";
import SearchBar from "./components/SearchBar.vue";
import Snapshot from "./components/Snapshot.vue";
import { getIndexLeaders, getCompanyInfo, getSnapshotData } from "./routes.js";
export default {
  name: "app",
  components: {
    Active,
    // Chart,
    CompanyInfo,
    SearchBar,
    Snapshot
  },
  data: () => {
    return {
      ticker: "",
      curCompany: "",
      mostActiveData: {},
      gainersData: {},
      losersData: {},
      iexVolumeData: {},
      iexPercentData: {},
      companyData: {},
      snapshotData: {}
    };
  },
  methods: {
    handleSubmit: function(ticker) {
      // this.submitResponse = response;
      console.log(ticker);
      getCompanyInfo(ticker).then(data => {
        console.log(typeof data, "company");
        this.companyData = data.data;
      });
      getSnapshotData(ticker).then(data => {
        this.snapshotData = data.data;
        console.log(data);
      });
    },
    handleActiveSubmit: function(activeData) {
      getCompanyInfo(activeData.symbol).then(data => {
        this.companyData = data.data;
        console.log(data.data);
        this.curCompany = data.data.companyName;
      });
      this.snapshotData = activeData;
    }
  },
  mounted() {
    // create a local storage function to check the time on these.
    getIndexLeaders("mostActive").then(data => {
      this.mostActiveData = data.data;
    });
    getIndexLeaders("gainers").then(data => {
      this.gainersData = data.data;
    });
    getIndexLeaders("losers").then(data => {
      this.losersData = data.data;
    });
    getIndexLeaders("iexvolume").then(data => {
      this.volumeData = data.data;
    });
    getIndexLeaders("iexpercent").then( data => {
      this.percentData = data.data
    });
  }
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
.appTitle {
  display: flex;
  text-align: left;
  font-size: 34px;
  font-weight: bold;
}
.app-qual-data {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.data-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
