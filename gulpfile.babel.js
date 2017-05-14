/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import gulp from 'gulp';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

// define where our paths are
const paths = {
  allSrcJs: 'src/**/*.js?(x)', // all js(x) files
  serverSrcJs: 'src/server/**/*.js?(x)', // server js(x) files
  sharedSrcJs: 'src/shared/**/*.js?(x)', // shared js(x) files
  clientEntryPoint: 'src/client/index.jsx', // client connection file
  clientBundle: 'dist/client-bundle.js?(.map)', // TODO: what is this?
  gulpFile: 'gulpfile.babel.js', // gulp configuration file
  webpackFile: 'webpack.config.babel.js', // webpack config file
  libDir: 'lib',
  distDir: 'dist',
};

// linting task
gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

// clean task (delete unneccessary files)
gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
]));

// main task, to be followed by lint and clean
gulp.task('main', ['lint', 'clean'], () =>
    gulp.src(paths.clientEntryPoint)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(paths.distDir)),
);

// watch task, which checks for file updates
gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

// define the default task
gulp.task('default', ['watch', 'main']);
