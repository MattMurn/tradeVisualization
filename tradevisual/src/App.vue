<template>
  <div id="app">
    <SearchBar v-on:handleTickerSubmit="handleSubmit" />
    <div class="app-qual-data">
      <CompanyInfo :info="this.companyInfo" />
      <Snapshot :info="this.snapshotData" />
    </div>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar.vue";
import CompanyInfo from "./components/CompanyInfo.vue";
import Snapshot from "./components/Snapshot.vue";
import { getSnapshotData, getCompanyInfo } from "./routes.js";
export default {
  name: "app",
  components: {
    SearchBar,
    CompanyInfo,
    Snapshot
  },
  data: () => {
    return {
      ticker: "",
      companyInfo: {},
      snapshotData: {}
    };
  },
  methods: {
    handleSubmit: function(ticker) {
      // this.submitResponse = response;
      console.log(ticker);
      getCompanyInfo(ticker).then(data => {
        console.log(data);
        this.companyInfo = data.data;
      });
      getSnapshotData(ticker).then(data => {
        this.snapshotData = data.data;
        console.log(data);
      });
    }
  },
  mounted() {
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
</style>
