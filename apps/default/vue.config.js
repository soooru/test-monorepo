const path = require('path');

module.exports = {
  chainWebpack: config => {
    // Alias 설정
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/css/_variables.scss";`, // SCSS 파일 import
      },
    },
  },
};
