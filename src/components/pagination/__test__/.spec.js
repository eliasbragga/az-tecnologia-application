import { shallowMount, createLocalVue } from "@vue/test-utils";
import Pagination from "../index.vue";
import Vuex from "vuex";
import loginVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Pagination.vue - Unit", () => {
  let store;  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(Pagination, {
      store,
      localVue,
    });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should change the value of the pagination variable to 1", async () => {
    const button_pagination = wrapper.find('[data-jest="pagination_1"]')
    await button_pagination.trigger('click')
    expect(wrapper.vm.pagination).toBe(1);
  });

  it("should change the value of the pagination variable to 2", async () => {
    const button_pagination = wrapper.find('[data-jest="pagination_2"]')
    await button_pagination.trigger('click')
    expect(wrapper.vm.pagination).toBe(2);
  });
  
});
