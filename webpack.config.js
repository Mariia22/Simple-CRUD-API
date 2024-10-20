import path from 'path';

export default {
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(import.meta.dirname, 'build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
