import { shallowMount, createLocalVue } from "@vue/test-utils";
import CandidateDataTable from "../index.vue";
import Vuex from "vuex";
import loginVuex from "@/store/application";
import Messages from "@/mixins/Messages.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CandidateDataTable.vue - Unit", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(loginVuex);
    wrapper = shallowMount(CandidateDataTable, { store, localVue });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should uses the Messages mixin correctly", () => {
    expect(wrapper.vm.$options.mixins).toContain(Messages);
  });

  it("should render all components", async () => {
    let messageRef = "MessageAlert";
    let buttonAcionsRef = "ActionUser";
    let buttonDeleteRef = "DeleteButton";
    let CardMobileRef = "CardMobile";
    wrapper.findComponent({ ref: messageRef });
    wrapper.findComponent({ ref: buttonAcionsRef });
    wrapper.findComponent({ ref: buttonDeleteRef });
    wrapper.findComponent({ ref: buttonDeleteRef });
    wrapper.findComponent({ ref: CardMobileRef });
  });
});
