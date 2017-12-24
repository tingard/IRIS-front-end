export default {
  output: {
    filename: 'client-bundle.js',
  },
  devtool: 'eval-cheap-module-source-map',
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
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader!react-svg-loader?jsx=1',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
