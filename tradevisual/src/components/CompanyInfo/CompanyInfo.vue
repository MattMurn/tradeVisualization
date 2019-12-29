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
    info: [Object, Array]
  },
  methods: {
    companyClick: function() {
      this.companySearch = !this.companySearch;
  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './CompanyInfo.scss';
</style>
