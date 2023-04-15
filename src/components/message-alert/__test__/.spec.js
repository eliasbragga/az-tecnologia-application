import { shallowMount, createLocalVue } from "@vue/test-utils";
import MessageAlert from "../index.vue";
import Vuex from "vuex";
import loginVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("MessageAlert.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(MessageAlert, {
      store,
      localVue,
      props: {
        message: "",
        successReq: true,
        showMessage: true,
      },
    });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have toast class ", async () => {
    await wrapper.setProps({ showMessage: true });
    const toast = wrapper.find('[data-jest="toast_container"]');
    expect(toast.classes()).toContain("toast");
  });

  it("should contain success class", async () => {
    await wrapper.setProps({ showMessage: true });
    await wrapper.setProps({ successReq: true });
    const toast = wrapper.find('[data-jest="toast_container"]');
    expect(toast.classes()).toContain("success");
  });

  it("should contain error class", async () => {
    await wrapper.setProps({ showMessage: true });
    await wrapper.setProps({ successReq: false });
    const toast = wrapper.find('[data-jest="toast_container"]');
    expect(toast.classes()).toContain("error");
  });

  it("should issue the closeToastMessage function", async () => {
    await wrapper.setProps({ showMessage: true });
    const button = wrapper.find('[data-jest="close_toast"]');
    await button.trigger("click");

    expect(wrapper.emitted("closeToastMessage")).toBeTruthy();
  });
});
