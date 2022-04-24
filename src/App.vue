<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <Table />

  {{data}}
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Table from "./components/Table.vue";

export default {
  name: "App",
  components: {
    Table,
  },
  data() {
    return {
      data: [],
    };
  },
  created() {
    axios
      .get(``)
      .then((response) => {
        this.data = response.data.results;
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
