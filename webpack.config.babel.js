// import paths from './gulp-paths';

export default {
  output: {
    filename: '[name]-bundle.js',
  },
  entry: {
    main: './src/client/main/index.jsx',
    student: './src/client/student/index.jsx',
    volunteer: './src/client/volunteer/index.jsx',
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
