export default {
  output: {
    filename: 'client-bundle.js',
  },
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.(jpg|png|gif|otf|eot|ttf|woff\d?)$/,
        loader: 'file-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
