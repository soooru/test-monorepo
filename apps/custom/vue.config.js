const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@core': path.resolve(__dirname, '../core/src'), // TODO: 이거 아닌거같은데 에휴
      },
    },
  },
};
