module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  env: {
    jest: true,
  },
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/__test__/**/*.spec.[jt]s"],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
  },
};
