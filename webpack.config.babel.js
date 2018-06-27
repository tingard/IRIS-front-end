// import paths from './gulp-paths';

export default {
  output: {
    filename: '[name]-bundle.js',
  },
  entry: {
    main: ['babel-polyfill', './src/client/main/index.jsx'],
    student: ['babel-polyfill', './src/client/student/index.jsx'],
    volunteer: ['babel-polyfill', './src/client/volunteer/index.jsx'],
    'licence-owner': ['babel-polyfill', './src/client/licence-owner/index.jsx'],
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
