/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import gulp from 'gulp';
import lec from 'gulp-line-ending-corrector';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import env from 'gulp-env';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import gzip from 'gulp-gzip';
import del from 'del';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpackConfig from './webpack.config.babel';
import paths from './gulp-paths';

if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = false;
  const plugs = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new UglifyJsPlugin(),
  ];
  webpackConfig.plugins = webpackConfig.plugins ? (
    webpackConfig.plugins.concat(plugs)
  ) : (
    webpackConfig.plugins = plugs
  );
}

function clean() {
  return del([
    paths.dist.bundles,
    paths.dist.css,
    paths.dist.manifest,
    `${paths.dist.dir}/${paths.dist.studentServiceWorker}`,
    `${paths.dist.dir}/${paths.dist.volunteerServiceWorker}`,
  ]);
}

function doWebpackWrapper(entry, watch = false) {
  const wc = Object.assign({}, webpackConfig);
  wc.watch = watch;
  function doWebpack() {
    return gulp.src(paths.src.client.main.entryPoint)
      .pipe(webpackStream(wc))
      .pipe(gzip())
      .pipe(gulp.dest(paths.dist.bundles));
  }
  return doWebpack;
}

function sassStyles_() {
  const sassFlow = (src, name) => {
    function doSass() {
      return gulp.src(src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat(`${name}.css`))
        .pipe(gulp.dest(paths.dist.css));
    }
    Object.defineProperty(doSass, 'name', { value: `doSass_${name || 'undefined'}` });
    return doSass;
  };
  return gulp.parallel(
    sassFlow(paths.src.client.main.scss, 'main'),
    sassFlow(paths.src.client.volunteer.scss, 'volunteer'),
    sassFlow(paths.src.client.student.scss, 'student'),
    sassFlow(paths.src.client.licenceOwner.scss, 'licence-owner'),
  );
}

const sassStyles = sassStyles_();

function moveManifest() {
  return gulp.src(paths.src.manifest).pipe(gulp.dest(paths.dist.dir));
}

function moveStudentSw() {
  return gulp.src(paths.src.client.studentServiceWorker).pipe(webpackStream({
    output: { filename: paths.dist.studentServiceWorker },
    plugins: [new UglifyJsPlugin()],
  })).pipe(gulp.dest(paths.dist.dir));
}

function moveVolunteerSw() {
  return gulp.src(paths.src.client.volunteerServiceWorker).pipe(webpackStream({
    output: { filename: paths.dist.volunteerServiceWorker },
    plugins: [new UglifyJsPlugin()],
  })).pipe(gulp.dest(paths.dist.dir));
}

const watchSass = () => gulp.watch(paths.src.client.scss, sassStyles);

const watchManifest = () => gulp.watch(paths.src.manifest, moveManifest);

const watchStudentSw = () => gulp.watch(
  [paths.src.offlinePageServiceWorker, paths.src.client.studentServiceWorker],
  moveStudentSw,
);

const watchVolunteerSw = () => gulp.watch(
  [paths.src.offlinePageServiceWorker, paths.src.client.volunteerServiceWorker],
  moveVolunteerSw,
);

/* ------------------------------- Main tasks ------------------------------- */

function lint() {
  return gulp.src([
    paths.src.js,
    paths.gulpfile,
    paths.webpackfile,
  ])
    .pipe(lec())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

const watch = gulp.parallel(
  doWebpackWrapper(paths.src.client.main.entryPoint, true),
  watchSass, watchManifest, watchStudentSw, watchVolunteerSw,
);

const build = gulp.parallel(
  sassStyles,
  moveManifest,
  moveStudentSw,
  moveVolunteerSw,
);

const compile = gulp.series(
  clean,
  gulp.parallel(
    build,
    doWebpackWrapper(paths.src.client.main.entryPoint, false),
  ),
);

function runServer() {
  env({
    file: '.env',
    type: 'ini',
    vars: {
      mode: 'development',
      PORT: '5000',
    },
  });
  return nodemon({
    script: paths.src.server.entryPoint,
    watch: [paths.src.server.js],
  });
}

const start = gulp.parallel(
  lint,
  watch,
  gulp.series(
    gulp.series(
      clean,
      build,
    ),
    runServer,
  ),
);

exports.start = start;
exports.compile = compile;
exports.lint = lint;
exports.watch = watch;
