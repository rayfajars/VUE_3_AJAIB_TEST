<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Username</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Gender</th>
        <th scope="col">Registered Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <th scope="row">{{ item.login.username }}</th>
        <td>{{ item.name.first }} {{ item.name.last }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ currentDateTime(item.registered.date) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import momentMixin from "../mixins/moment";

export default {
  mixins: [momentMixin],
  data() {
    return {
      data: [],
    };
  },
  created() {
    axios
      .get(`/?page=1&pageSize=10&results=10	`)
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

<style></style>
