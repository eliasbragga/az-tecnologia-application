import { createLocalVue, shallowMount } from "@vue/test-utils";
import Dashboard from "../index.vue";
import router from "@/router/index";
import Vuex from "vuex";
import applicationVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Dashboard.vue", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(applicationVuex);
    wrapper = shallowMount(Dashboard, {
      store,
      localVue,
      router,
    });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should be a button maximizing dashboard", async () => {
    const button = wrapper.find(".button_min_dashboard");
    expect(button.exists()).toBe(true);
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
