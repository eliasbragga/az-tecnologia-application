import { getCandidates } from "@/services/candidates";
import { mapGetters, mapMutations } from "vuex";
const Messages = {
  data: () => ({
    showMessage: false,
    successReq: false,
    messageToast: "",
    widthWindow: window.innerWidth,
  }),
  computed: {
    ...mapGetters(["pagination"]),
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
      (this.showMessage = event?.showMessage),
      (this.messageToast = event?.messageToast),
      (this.successReq = event?.successReq);
      if (event?.successReq === true) {
        this.getCandidates(this?.pagination);
      }
      return {
        showMessage: event?.showMessage || false,
        messageToast: event?.messageToast || "",
        successReq: event?.successReq || false,
      };
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

export default Messages;
