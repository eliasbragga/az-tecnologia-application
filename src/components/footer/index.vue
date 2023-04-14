<template>
  <footer
    :class="isLogged ? 'min_width' : ''"
    :style="isClicked ? { width: 'calc(100% - 95px) !important' } : ''"
  >
    <span class="text">Copyright &#169; 2023</span>
    <span>v 1.0.0</span>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Footer",
  props: {
    isLogged: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["isClicked"]),
  },
};
</script>

<style scoped>
footer {
  height: 50px;
  background: #f7f8fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  transition: width 0.5s ease;
}
span {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: rgba(98, 98, 98, 0.8);
}
.min_width {
  width: calc(100% - 170px) !important;
  margin-left: auto;
}

@media screen and (max-width: 960px) {
  .min_width {
    width: 100% !important;
    margin: 0;
  }
}
</style>