import { shallowMount, createLocalVue } from "@vue/test-utils";
import CardCandidateMobile from "../index.vue";
import Vuex from "vuex";
import applicationVuex from "@/store/application";
import router from "@/router/index";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CardCandidateMobile.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(applicationVuex);
    wrapper = shallowMount(CardCandidateMobile, {
      store,
      localVue,
      router,
    });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render all components", async () => {
    let messageRef = "messageAlert";
    let buttonAcionsRef = "ActionUser";
    let buttonDeleteRef = "DeleteButton";
    wrapper.findComponent({ ref: messageRef });
    wrapper.findComponent({ ref: buttonAcionsRef });
    wrapper.findComponent({ ref: buttonDeleteRef });
  });

  it("should uses the Messages mixin correctly", () => {
    const mixinData = wrapper.vm.messageToastHandle();
    expect(mixinData).toEqual({
      showMessage: false,
      messageToast: "",
      successReq: false,
    });
  });
});
