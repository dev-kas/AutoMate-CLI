// const { DefinePlugin } = require('webpack');
// const TerserPlugin = require('terser-webpack-plugin');
// const path = require('path');
// const pkg = require('./package.json');

// module.exports = {
//   entry: './src/index.ts',
//   output: {
//     filename: 'index.js',
//     path: path.join(__dirname, 'dist'),
//   },
//   resolve: {
//     extensions: ['.ts', '.js'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [new TerserPlugin()],
//   },
//   plugins: [
//     new DefinePlugin({
//       __version__: JSON.stringify(pkg.version),
//       __config__: JSON.stringify(pkg.config),
//     }),
//   ],
//   mode: 'production',
//   target: 'node',
// };

const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
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
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new DefinePlugin({
      __version__: JSON.stringify(pkg.version),
      __config__: JSON.stringify(pkg.config),
    }),
  ],
  mode: 'production',
  target: 'node',
  externals: {
    'robotjs': 'commonjs robotjs',
  },
};
