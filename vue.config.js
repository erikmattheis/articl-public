const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "~/node_modules/@picocss/pico/scss/pico.scss";
          `,
      },
    },
  },
});
