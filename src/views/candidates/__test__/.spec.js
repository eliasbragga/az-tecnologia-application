import { shallowMount, createLocalVue } from "@vue/test-utils";
import Candidates from "../index.vue";
import Vuex from "vuex";
import applicationVuex from "@/store/application";
import router from "@/router/index";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Candidates.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(applicationVuex);
    wrapper = shallowMount(Candidates, {
      store,
      localVue,
      router,
    });
  });

  it("should clear the logout flag value", async () => {
    expect(wrapper.vm.logout).toBe(false);
  });

  it("should exist userDataTable component", async () => {
    let userDataTable = "UserDataTable";
    wrapper.findComponent({ ref: userDataTable });
  });
});
