/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import env from 'gulp-env';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';


const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  clientSrcJs: 'src/client/**/*.js?(x)',
  clientSrcScss: 'src/client/styles/sass/*.scss',
  clientSrcCss: 'src/client/styles/css/',
  distCssFile: 'dist/styles/',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  serverEntryPoint: 'src/server/index.js',
  clientEntryPoint: 'src/client/index.jsx',
  clientBundle: 'dist/client-bundle.js?(.map)',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
};

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

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
]));

gulp.task('sass-styles', () => {
  gulp.src(paths.clientSrcScss)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.distCssFile));
});

gulp.task('main', ['lint', 'clean', 'sass-styles'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir)),
);

gulp.task('watch', () => {
  gulp.watch([paths.allSrcJs, paths.clientSrcScss], ['main']);
});

gulp.task('start-dev', () => {
  env({
    file: '.env',
    type: 'ini',
    vars: {
      // any variables you want to overwrite in dev
      mode: 'development',
      PORT: '5000',
      // point to test database in .env file
    },
  });
  nodemon({
    script: paths.serverEntryPoint,
    watch: [paths.allSrcJs, paths.clientSrcScss], // this doesn't seem to be working as expected
    tasks: ['main'],
  });
});

gulp.task('default', ['main', 'watch']);
