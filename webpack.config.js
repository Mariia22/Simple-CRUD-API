const path = require('path')

module.exports = {
  entry: './src/index.ts',
  target: "node",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: [".ts"]
  }
};
