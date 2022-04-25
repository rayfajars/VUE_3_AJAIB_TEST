<template>
  <div class="row g-3">
    <div class="col-md-4">
      <label for="search" class="form-label float-start">Search</label>
      <div class="input-group">
        <input
          @keyup="searchData"
          type="text"
          class="form-control"
          placeholder="search..."
          v-model="keyword"
        />
        <span class="input-group-text"
          ><font-awesome-icon icon="search"
        /></span>
      </div>
    </div>
    <div class="col-md-4">
      <label for="inputState" class="form-label float-start">Gender</label>
      <select
        class="form-select form-control"
        @change="selectGender($event)"
        v-model="gender"
        aria-label="Default select example"
      >
        <option value="">All Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div class="col-md-4">
      <label for="form-label float-start"></label>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="resetFilter"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12 mt-5">
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
    </div>
    <div class="col-lg-12">
      <nav aria-label="Page navigation example ">
        <ul class="pagination">
          <li class="page-item">
            <button class="page-link" @click="changePage(`prev_page_url`)">
              Previous
            </button>
          </li>

          <template v-for="item in allPage">
            <li class="page-item" :class="{ active: item == this.page }">
              <button class="page-link" @click="changePage(item)">
                {{ item }}
              </button>
            </li>
          </template>

          <li class="page-item">
            <button class="page-link" @click="changePage(`next_page_url`)">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import momentMixin from "../mixins/moment";

export default {
  mixins: [momentMixin],
  data() {
    return {
      data: [],
      url: `/?pageSize=10&results=10`,
      routes: [],
      gender: "",
      keyword: "",
      page: 1,
      next_page_url: "",
      prev_page_url: "",
      allPage: [1, 2, 3],
      minPage: 1,
      maxPage: 3,
    };
  },

  methods: {
    createdData() {
      axios
        .get(this.url, {
          params: {
            page: this.page,
            gender: this.gender,
            keyword: this.keyword,
          },
        })
        .then((response) => {
          this.data = response.data.results;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    selectGender(event) {
      this.gender = event.target.value;
      this.createdData();
    },
    searchData(event) {
      this.keyword = event.target.value;
      this.createdData();
    },
    resetFilter() {
      // console.log('click')
      this.gender = "";
      this.keyword = "";
      this.createdData();
    },
    changePage(value) {
      if (value == "next_page_url") {
        if (this.page == this.allPage[this.allPage.length - 1]) {
          this.page = 3;
        } else {
          this.page = this.page + 1;
        }
      } else if (value == "prev_page_url") {
        if (this.page == this.allPage[0]) {
          this.page = 1;
        } else {
          this.page = this.page - 1;
        }
      } else {
        this.page = value;
      }

      this.createdData();

      console.log(value);
    },
  },
  mounted() {
    this.createdData();
  },
};
</script>

<style></style>
