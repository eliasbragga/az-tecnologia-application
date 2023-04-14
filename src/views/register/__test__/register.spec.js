import { shallowMount, createLocalVue } from "@vue/test-utils";
import Register from "../index.vue";
import Vuex from "vuex";
import loginVuex from "@/store/login";
import axios from "axios";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Register.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(Register, { store, localVue });
  });

  it("should return the set value ", async () => {
    const email = "eve.holt@reqres.in";
    const password = "123456";
    await wrapper.find("[data-jest='input_user_register_email']").setValue(email);
    await wrapper.find("[data-jest='input_user_register_password']").setValue(password);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.form.inputBind).toBe(email);
    expect(wrapper.vm.form.passwordBind).toBe(password);
  });

  it("should set the values of data ​​to vuex", async () => {
    // const token = 'QpwL5tke4Pnpja7X4'
    // axios.interceptors.request.use(() => {
    //     return {
    //         token,
    //     };
    //   });


    // const email = "eve.holt@reqres.in";
    // const password = "123456";
    // await wrapper
    //   .find("[data-jest='input_user_register_email']")
    //   .setValue(email);
    // await wrapper
    //   .find("[data-jest='input_user_register_password']")
    //   .setValue(password);
    // await wrapper.find("[data-jest='button_user_register']").trigger("click");
    // await wrapper.vm.handleClick()
    // await wrapper.vm.$nextTick();
    // expect(wrapper.vm.token).toBe()

    // expect(wrapper.vm.user).toBe(email);
    // expect(wrapper.vm.password).toBe(password);
  });
});
