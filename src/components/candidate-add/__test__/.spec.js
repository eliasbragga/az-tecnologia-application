import { shallowMount, createLocalVue } from "@vue/test-utils";
import AddCandidate from "../index.vue";

describe("AddCandidate", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(AddCandidate, {});
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should be an add button", () => {
    const button = wrapper.find(".button_add_span");
    expect(button.exists()).toBe(true);
  });

  it("should shows the message alert when showMessage is set to true", () => {
    wrapper.setData({ showMessage: true });
    const messageAlert = wrapper.findComponent({ name: "MessageAlert" });
    expect(messageAlert.exists()).toBe(true);
  });

  it("should renders the image correctly", () => {
    const image = wrapper.find(".table_empty_container img");
    expect(image.attributes("src")).toBe("@/assets/Vector (5).png");
  });

  it("should applies the correct CSS classes", () => {
    const container = wrapper.find(".table_container");
    expect(container.classes()).toContain("table_container");
  });

  it("should uses the Messages mixin correctly", () => {
    const mixinData = wrapper.vm.messageToastHandle();
    expect(mixinData).toEqual({
      showMessage: false,
      messageToast: "",
      successReq: false,
    });
  });
});
