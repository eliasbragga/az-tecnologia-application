import { shallowMount, createLocalVue } from "@vue/test-utils";
import AlertDelete from "../alert-delete.vue";
import Vuex from "vuex";
import loginVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AlertDelete.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(AlertDelete, {
      store,
      localVue,
      props: {
        id: "",
        name: "",
      },
    });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should change the dialog variable value to true ", async () => {
    const button_open_dialog = wrapper.find('[data-jest="button_open_dialog"]');
    await button_open_dialog.trigger("click");
    expect(wrapper.vm.dialog).toBe(true);
  });

  it("should change the dialog variable value to false ", async () => {
    await wrapper.setData({ dialog: true });
    const button_open_dialog = wrapper.find('[data-jest="close_dialog_icon"]');
    await button_open_dialog.trigger("click");
    expect(wrapper.vm.dialog).toBe(false);
  });

  it("should change the dialog variable value to false ", async () => {
    await wrapper.setData({ dialog: true });
    const button_open_dialog = wrapper.find('[data-jest="button_closeDialog"]');
    await button_open_dialog.trigger("click");
    expect(wrapper.vm.dialog).toBe(false);
  });

  it("should emit messageToast function ", async () => {
    await wrapper.setData({ dialog: true });
    const button_open_dialog = wrapper.find('[data-jest="button_handleClick"]');
    await button_open_dialog.trigger("click");
    await wrapper.vm.handleClick();
    expect(wrapper.emitted("messageToast")).toBeTruthy();
  });
});
