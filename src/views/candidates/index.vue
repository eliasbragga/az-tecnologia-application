<template>
  <div class="header_container">
    <UserDataTable :total="total" @changePagination="changePagination"/>
  </div>
</template>

<script>
import UserDataTable from "@/components/candidate-data-table/index.vue";
import { mapGetters, mapMutations } from "vuex";
import MyMixin from "@/mixins/MyMixin.js";
export default {
  name: "Candidates",
  mixins: [MyMixin],
  components: {
    UserDataTable,
  },
  data: () => ({
    total: 0,
  }),
  computed: {
    ...mapGetters(["pagination"]),
  },
  methods: {
    ...mapMutations(["SET_CANDIDATES", "SET_LOGOUT"]),
    changePagination() {
      this.page = this.pagination;
      this.getCandidates(this.pagination);
    },
  },
  mounted() {
    this.SET_LOGOUT(false);
    this.getCandidates(this.page);
  },
  watch: {
    pagination(newValue) {
      this.getCandidates(newValue);
    },
  },
};
</script>

<style scoped>
.home_container {
  height: 100%;
  display: flex;
}

.header_container {
  width: 100%;
  height: 97%; 
}
</style>