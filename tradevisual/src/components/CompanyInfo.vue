<template>
  <div class="company-info">
    <h1 v-on:click="companyClick()">Company Info</h1>
    <div v-if="companySearch" class="company-content">
      <div class="company-content-category">
        <a :href="info.website" target="_blank">{{info.companyName}}</a>
      </div>
      <div>
        <span class="company-content-category">Symbol -</span>
        {{info.symbol}}
      </div>
      <div>
        <span class="company-content-category">Exchange -</span>
        {{info.exchange}}
      </div>
      <div>
        <span class="company-content-category">Sector -</span>
        {{info.sector}}
      </div>
      <div>
        <span class="company-content-category">Description -</span>
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
.company-info {
  flex-basis: 50%;
}
.company-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.company-content-category {
  font-size: 20px;
  font-weight: 600;
}
</style>
