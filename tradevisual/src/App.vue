<template>
  <div id="app">
    <SearchBar v-on:handleTickerSubmit="handleSubmit" />
    <div class="data-wrapper">
      <Active v-on:handleActiveSubmit="handleActiveSubmit" :info="this.mostActiveData" />
      <Chart />
    </div>
    <div class="app-qual-data">
      <CompanyInfo :info="this.companyData" />
      <Snapshot :info="this.snapshotData" />
    </div>
  </div>
</template>

<script>
import Active from "./components/Active.vue";
import Chart from "./components/Chart.vue";
import CompanyInfo from "./components/CompanyInfo.vue";
import SearchBar from "./components/SearchBar.vue";
import Snapshot from "./components/Snapshot.vue";
import { getMostActive, getCompanyInfo, getSnapshotData } from "./routes.js";
export default {
  name: "app",
  components: {
    Active,
    Chart,
    CompanyInfo,
    SearchBar,
    Snapshot
  },
  data: () => {
    return {
      ticker: "",
      mostActiveData: {},
      companyData: {},
      snapshotData: {}
    };
  },
  methods: {
    handleSubmit: function(ticker) {
      // this.submitResponse = response;
      console.log(ticker);
      getCompanyInfo(ticker).then(data => {
        console.log(typeof(data), 'company');
        this.companyData = data.data;
      });
      getSnapshotData(ticker).then(data => {
        this.snapshotData = data.data;
        console.log(data);
      });
    },
    handleActiveSubmit: function(activeData) {
      getCompanyInfo(activeData.symbol)
      .then(data => {

        this.companyData = data.data;
      });
      this.snapshotData = activeData;
    }
  },
  mounted() {
    getMostActive().then( data => this.mostActiveData = data.data);
    console.log("app initialized & mounted");
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
  margin-top: 60px;
}
.app-qual-data {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.data-wrapper {
  display: flex;
}
</style>
