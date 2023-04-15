export default {
    state: {
      user: "",
      email: "",
      password: "",
      token: "",
      userLogged:"",
      candidates: [],
      isClicked: false, // flag para animacao da dashboard
      logout: false, // flag para realizar logout
      pagination: 1 || ""
    },
    getters: {
      user: state => state.user,
      email: state => state.email,
      password: state => state.password,
      token: state => state.token,
      userLogged: state => state.userLogged,
      candidates: state => state.candidates,
      isClicked: state => state.isClicked,
      logout: state => state.logout,
      pagination: state => state.pagination,
    },
    mutations: {
      SET_USER: (state, payload) => state.user = payload,
      SET_EMAIL: (state, payload) => state.email = payload,
      SET_PASSWORD: (state, payload) => state.password = payload,
      SET_TOKEN: (state, payload) => state.token = payload,
      SET_USERLOGGED: (state, payload) => state.userLogged = payload,
      SET_CANDIDATES: (state, payload) => state.candidates = payload,
      SET_ISCLICKED: (state, payload) => state.isClicked = payload,
      SET_LOGOUT: (state, payload) => state.logout = payload,
      SET_PAGINATION: (state, payload) => state.pagination = payload,
    },
  }