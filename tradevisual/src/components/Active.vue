<template>
  <div class="most-active">
    <ul v-bind:key="format.companyName" v-for="format in info">
      <li>{{format.companyName}}</li>
      <li>{{format.latestPrice}}</li>
      <li>{{(format.changePercent *100).toFixed(2)}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Active",
  data: () => {
    return {};
  },
  props: {
    info: Object
  },
  methods: {},
  mounted() {
    console.log(this.info);
    console.log("most-active mounted");
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
.most-active {
  height: 300px;
  flex-basis: 30%;
  background: cornflowerblue;
}
</style>
