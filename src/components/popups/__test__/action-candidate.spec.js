import { shallowMount, createLocalVue } from "@vue/test-utils";
import ActionCandidate from "../action-candidate.vue";
import Vuex from "vuex";
import loginVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("shallowMount.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(ActionCandidate, {
      store,
      localVue,
      props: {
        id: "",
        edit: true,
      },
    });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should change the dialog variable value to true ", async () => {
    const button_open_dialog = wrapper.find(
      '[data-jest="button_open_dialog_create"]'
    );
    await button_open_dialog.trigger("click");
    expect(wrapper.vm.dialog).toBe(true);
  });

  it("should change the dialog variable value to false ", async () => {
    await wrapper.setData({ dialog: true });
    const button_open_dialog = wrapper.find('[data-jest="close_dialog_icon"]');
    await button_open_dialog.trigger("click");
    expect(wrapper.vm.dialog).toBe(false);
  });

  it("should set button_add_user_mobile class ", async () => {
    await wrapper.setData({ widthWindow: 800 });
    const button_open_dialog = wrapper.find(
      '[data-jest="button_open_dialog_create"]'
    );
    expect(button_open_dialog.classes()).toContain("button_add_user_mobile");
  });

  it("should set button_add_user class ", async () => {
    await wrapper.setData({ widthWindow: 1000 });
    const button_open_dialog = wrapper.find(
      '[data-jest="button_open_dialog_create"]'
    );
    expect(button_open_dialog.classes()).toContain("button_add_user");
  });

  it("should send the emmit when the button is clicked ", async () => {
    await wrapper.setData({ dialog: true });
    const name = "Janancia Martins";
    const job = "Desenvolvedor .Net";
    await wrapper.find("[data-jest='input_user_name']").setValue(name);
    await wrapper.find("[data-jest='input_user_job']").setValue(job);
    const button_open_dialog = wrapper.find('[data-jest="button_handleClick"]');
    await button_open_dialog.trigger("click");
    await wrapper.vm.createCandidate();
    expect(wrapper.emitted("messageToast")).toBeTruthy();
  });

  it("should call updateCandidate function if it has id ", async () => {
    await wrapper.setData({ dialog: true });
    const name = "Janancia Martins";
    const job = "Desenvolvedor .Net";
    await wrapper.find("[data-jest='input_user_name']").setValue(name);
    await wrapper.find("[data-jest='input_user_job']").setValue(job);
    const button_open_dialog = wrapper.find('[data-jest="button_handleClick"]');
    await button_open_dialog.trigger("click");
    await wrapper.vm.updateCandidate();
    expect(wrapper.emitted("messageToast")).toBeTruthy();
  });
});
