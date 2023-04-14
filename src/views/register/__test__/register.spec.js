import { shallowMount, createLocalVue } from "@vue/test-utils";
import Register from "../index.vue";
import Vuex from "vuex";
import loginVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Register.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(Register, { store, localVue });
  });

  it("should define value of data variables ", async () => {
    const email = "eve.holt@reqres.in";
    const password = "123456";
    await wrapper
      .find("[data-jest='input_user_register_email']")
      .setValue(email);
    await wrapper
      .find("[data-jest='input_user_register_password']")
      .setValue(password);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.form.inputBind).toBe(email);
    expect(wrapper.vm.form.passwordBind).toBe(password);
  });
});
