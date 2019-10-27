<template>
  <div v-on:click="companyClick()" class="compnay-info">
    <h1>Company Info</h1>
    <div v-if="companySearch" class="companyContent">
      <div>
        <a :href="info.website" target="_blank">{{info.companyName}}</a>
      </div>
      <div>
        <span>Symbol -</span>
        {{info.symbol}}
      </div>
      <div>
        <span>Exchange -</span>
        {{info.exchange}}
      </div>
      <div>
        <span>Sector -</span>
        {{info.sector}}
      </div>
      <div>
        <span>Description -</span>
        {{info.description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyInfo",
  data: () => {
    return {
      companySearch: false
    };
  },
  props: {
    info: Object
  },
  methods: {
    companyClick: function() {
      this.companySearch = !this.companySearch;
  }
  },
  mounted() {
    console.log("companyInfo mounted");
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
</style>
