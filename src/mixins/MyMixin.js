import { getCandidates } from "@/services/candidates";
import { mapGetters, mapMutations } from "vuex";
const MyMixin = {
  data: () => ({
    showMessage: false,
    successReq: false,
    messageToast: "",
    widthWindow: window.innerWidth

  }),
  computed: {
    ...mapGetters(['pagination'])
  },
  methods: {
    ...mapMutations(["SET_CANDIDATES"]),
    async getCandidates(page) {
      try {
        const response = await getCandidates(page);
        this.SET_CANDIDATES(response.data.data);
        this.total = response.data.total;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingField = false;
      }
    },

    // funcao emitida por popup
    messageToastHandle(event) {
      (this.messageToast = event.messageToast),
      (this.successReq = event.successReq),
      (this.showMessage = event.showMessage);
      if(event.successReq === true)
      this.getCandidates(this.pagination);
    },

    closeToastMessage(event) {
      this.showMessage = event;
    },
    openDropdown() {
      this.dropdown = !this.dropdown;
    },
    toGoLogout() {
      this.SET_LOGOUT(true);
    },
    widthWindows() {
      this.widthWindow = window.innerWidth;
    },
  },
};

export default MyMixin;
