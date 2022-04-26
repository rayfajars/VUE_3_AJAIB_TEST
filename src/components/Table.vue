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
      <table class="table table-bordered">
        <thead style="background: #000; color: #fff">
          <tr>
            <th scope="col" class="text-uppercase">Username</th>
            <template v-for="item in thSort">
              <th scope="col"  class="text-uppercase" @click="sortColumn(item)">
                {{item}}
                <div
                  class="arrow"
                  v-if="item == nameColumn"
                  :class="ascending ? 'arrow_up' : 'arrow_down'"
                ></div>
              </th>
            </template>
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
      ascending: false,
      nameColumn: "",
      sortBy: "",
      sortOrder: "",
      thSort: ["name", "email", "gender", "registered date"],
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
            sortBy: this.sortBy,
            sortOrder: this.sortOrder,
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

      // console.log(value);
    },
    sortColumn(value) {
      // console.log(value)
      this.sortBy = value;

      if (this.nameColumn === value) {
        this.ascending = !this.ascending;
        if (this.ascending == true) {
          this.sortOrder = "ascend";
        } else {
          this.sortOrder = "descend";
        }
      } else {
        this.ascending = true;
        this.nameColumn = value;
      }

      console.log(this.nameColumn);

      this.createdData();
    },
  },
  mounted() {
    this.createdData();
  },
};
</script>

<style>
.arrow_down {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC");
}
.arrow_up {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=");
}
.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
  color: black;
}
</style>
