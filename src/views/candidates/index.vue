<template>
  <div class="header_container">
    <UserDataTable  ref="UserDataTable"/>
  </div>
</template>

<script>
import UserDataTable from "@/components/candidate-data-table/index.vue";
import { mapGetters, mapMutations } from "vuex";
import Messages from "@/mixins/Messages.js";
export default {
  name: "Candidates",
  mixins: [Messages],
  components: {
    UserDataTable,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["pagination", "logout"]),
  },
  methods: {
    ...mapMutations(["SET_CANDIDATES", "SET_LOGOUT"]),
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