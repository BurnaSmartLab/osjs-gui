const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const minimize = mode === 'production';

module.exports = {
  mode,
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/umd.js')
  ],
  output: {
    library: 'osjsGui',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    sourceMapFilename: '[file].map',
    filename: '[name].js'
  },
  optimization: {
    minimize,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
