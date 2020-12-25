/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: ["@snowpack/plugin-svelte", "@snowpack/plugin-webpack"],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    "/notes": {
      target: "http://localhost:3002",
      secure: false,
      changeOrigin: true,
    },
  },
  alias: {
    /* ... */
  },
};
