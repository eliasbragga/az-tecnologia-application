import { shallowMount, createLocalVue } from "@vue/test-utils";
import InputHamburger from "../index.vue";
import Vuex from "vuex";
import loginVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("InputHamburger.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(InputHamburger, { store, localVue });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should change the logout flag value to true when clicking the button  ", async () => {
    await wrapper.setData({ hamburgerOptionVisibility: true });
    await wrapper.find('[data-jest="button_logout"]').trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.logout).toBe(true);
  });

  it("should change value of hamburgerOptionVisibility flag on button click  ", async () => {
    await wrapper.find('[data-jest="button_open_hamburger"]').trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.hamburgerOptionVisibility).toBe(true);
  });
});
