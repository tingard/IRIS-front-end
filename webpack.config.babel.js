// import paths from './gulp-paths';
import WebpackBar from 'webpackbar';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

export default {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js',
  },
  entry: {
    main: './src/client/main/index.jsx',
    student: './src/client/student/index.jsx',
    volunteer: './src/client/volunteer/index.jsx',
    'licence-owner': './src/client/licence-owner/index.jsx',
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
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
  plugins: (process.env.NODE_ENV === 'production'
    ? [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new UglifyJsPlugin(),
    ]
    : [new WebpackBar()]
  ),
};
