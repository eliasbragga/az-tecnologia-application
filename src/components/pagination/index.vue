<template>
  <div class="pagination">
    <span style="margin-right: .5rem">{{pagination}} de 2</span>
    <a @click="changePagination(1)" :class="pagination === 1 ? 'active' : ''"
      >1</a
    >
    <a @click="changePagination(2)" :class="pagination === 2 ? 'active' : ''"
      >2</a
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Pagination",
  data: () => ({}),
  computed: {
    ...mapGetters(["pagination"]),
  },
  methods: {
    ...mapMutations(["SET_PAGINATION"]),
    changePagination(page) {
      this.SET_PAGINATION(page);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
  margin-left: auto;
  margin-bottom: 0.5rem;
}

.pagination a {
  cursor: pointer;
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination a.active {
  background: #0067a5;
  color: white;
  border: 1px solid #0067a5;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>