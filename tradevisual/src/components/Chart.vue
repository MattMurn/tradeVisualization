<template>
  <div class="chart"></div>
</template>

<script>
export default {
  name: "Chart",
  data: () => {
    return {};
  },
  methods: {},
  mounted() {
    console.log("chart mounted");
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
.chart {
  height: 300px;
  flex-basis: 70%;
  background: pink;
}
</style>
