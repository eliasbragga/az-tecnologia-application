import { shallowMount } from "@vue/test-utils";
import ButtonAddCadidate from "../index.vue";
import MessageAlert from "@/components/message-alert/index.vue";
import Messages from "@/mixins/Messages.js";

describe("ButtonAddCadidate", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ButtonAddCadidate);
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should uses the Messages mixin correctly", () => {
    expect(wrapper.vm.$options.mixins).toContain(Messages);
  });

  it("should shows the message alert when showMessage is true", () => {
    const wrapper = shallowMount(ButtonAddCadidate, {
      data() {
        return { showMessage: true };
      },
    });
    expect(wrapper.findComponent(MessageAlert).props("showMessage")).toBe(true);
  });

  it("should hides the message alert when showMessage is false", () => {
    const wrapper = shallowMount(ButtonAddCadidate, {
      data() {
        return { showMessage: false };
      },
    });
    expect(wrapper.findComponent(MessageAlert).props("showMessage")).toBe(
      false
    );
  });
});
