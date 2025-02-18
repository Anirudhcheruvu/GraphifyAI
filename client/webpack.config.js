const path = require('path');

module.exports = {
  entry: './clientScript.js',  // Your entry file
  output: {
    filename: 'clientScript.js',  // Output bundled file
    path: path.resolve(__dirname, '../extension')  // Path to save the bundled file
  },
  mode: 'development',  // Or 'production' for optimized builds
  module: {
    rules: [
      {
        test: /\.js$/,  // Apply the rule to JavaScript files
        exclude: /node_modules/,  // Exclude node_modules from being bundled
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map',  // Optional: Generate source maps for easier debugging
  resolve: {
    extensions: ['.js']  // Resolve .js files
  }
};
