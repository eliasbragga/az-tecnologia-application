import { createLocalVue, shallowMount } from "@vue/test-utils";
import Header from "../index.vue";
import router from "@/router/index";
import Vuex from "vuex";
import applicationVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Header.vue", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(applicationVuex);
    wrapper = shallowMount(Header, {
      props: {
        isLogged: true,
      },
      store,
      localVue,
      router,
    });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should displays dropdown button correctly", () => {
    expect(wrapper.find(".dropbtn").exists()).toBe(true);
  });

  it("should shows dropdown menu on dropdown button click", async () => {
    await wrapper.find(".dropbtn").trigger("click");
    expect(wrapper.find(".card_hamburger").exists()).toBe(true);
  });

  it("should hides dropdown menu on second dropdown button click", async () => {
    await wrapper.find(".dropbtn").trigger("click");
    await wrapper.find(".dropbtn").trigger("click");
    expect(wrapper.find(".card_hamburger").exists()).toBe(false);
  });

  it("should change logout flag value to true", async () => {
    await wrapper.setData({hamburgerOptionVisibility: true})
    await wrapper.find("[data-jest='button_logout_dropdown']").trigger("click");
    expect(wrapper.vm.logout).toBe(true);
  });

});
