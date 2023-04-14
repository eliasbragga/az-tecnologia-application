import { shallowMount, createLocalVue } from "@vue/test-utils";
import Login from "../index.vue";
import Vuex from "vuex";
import loginVuex from "@/store/login";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(Login, { store, localVue });
  });

  it("should return the set value ", async () => {
    const email = "eve.holt@reqres.in";
    const senha = "eve.holt@reqres.in";
    await wrapper.find("[data-jest='input_user_email']").setValue(email);
    await wrapper.find("[data-jest='input_user_password']").setValue(senha);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.form.inputBind).toBe(email);
    expect(wrapper.vm.form.passwordBind).toBe(senha);
  });

  it("should set the values of data ​​to vuex  ", async () => {
    const email = "eve.holt@reqres.in";
    const senha = "123456";
    await wrapper.find("[data-jest='input_user_email']").setValue(email);
    await wrapper.find("[data-jest='input_user_password']").setValue(senha);
    await wrapper.find("[data-jest='button_user_login']").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.user).toBe(email);
    expect(wrapper.vm.password).toBe(senha);
  });
});
