var webpack = require("webpack");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new webpack.DefinePlugin({
          process: { env: {} },
        }),
      ],
    },
  },
};
