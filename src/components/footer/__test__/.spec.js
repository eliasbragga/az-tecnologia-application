import { createLocalVue, shallowMount } from "@vue/test-utils";
import Footer from "../index.vue";
import router from "@/router/index";
import Vuex from "vuex";
import applicationVuex from "@/store/application";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Footer.vue", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store(applicationVuex);
    wrapper = shallowMount(Footer, {
      props: {
        isLogged: true,
      },
      store,
      localVue,
      router,
    });
  });

  it("should renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should apply the correct style when isClicked is true", () => {
    const wrapper = shallowMount(Footer, {
      computed: {
        isClicked: () => true,
      },
      props: {
        isLogged: true,
      },
    });
    expect(wrapper.attributes("style")).toBe("width: calc(100% - 95px);");
  });
});
