/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import gulp from 'gulp';
import lec from 'gulp-line-ending-corrector';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import env from 'gulp-env';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: './src/**/*.js?(x)',
  clientSrcJs: 'src/client/**/*.js?(x)',
  clientSrcScss: 'src/client/*/styles/sass/*.scss',
  clientSrcCss: 'src/client/*/styles/css/',
  distCssFile: 'dist/styles/',
  distManifestFile: 'dist/manifest.json',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/index.jsx',
  serverEntryPoint: 'src/server/index.js',
  clientBundle: 'dist/client-bundle.js?(.map)',
  manifestFile: 'manifest.json',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
  reactSelectCSS: 'node_modules/react-select/dist/react-select.css',
};

gulp.task('default', ['lint', 'clean'], () => {
  gulp.start('sass-styles');
  gulp.start('move-manifest');
  return gulp.start('webpack');
});

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(lec())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('move-manifest', () => (
  gulp.src(paths.manifestFile).pipe(gulp.dest(paths.distDir))),
);

gulp.task('compile', ['clean'], () => {
  gulp.start('sass-styles');
  return gulp.start('webpack');
});

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
  paths.distCssFile,
  paths.distManifestFile,
]));

gulp.task('webpack', () => (
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
));

gulp.task('sass-styles', () => {
  gulp.src(paths.clientSrcScss)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.distCssFile));
  return gulp.src(paths.reactSelectCSS)
    .pipe(gulp.dest(paths.distCssFile));
});

gulp.task('watch', ['default'], () => (
  gulp.watch([paths.allSrcJs, paths.clientSrcScss], ['default'])),
);

gulp.task('start-dev', ['default'], () => {
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
    ext: 'js scss jsx svg',
    watch: ['src'], // this doesn't seem to be working as expected
    tasks: ['default'],
  });
});
