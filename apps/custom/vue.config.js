module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/css/_variables.scss";`, // SCSS 파일 import
      },
    },
  },
};
