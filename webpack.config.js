module.exports = {
  // Add your entry/output settings here if not already present
  // Example:
  // entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'bundle.js'
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/react-datepicker/, // Suppress warning
        ],
      },
    ],
  },

  devServer: {
  historyApiFallback: true,
}
};