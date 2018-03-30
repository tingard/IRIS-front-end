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

const paths = {
  gulpfile: 'gulpfile.babel.js',
  webpackfile: 'webpack.config.babel.js',
  reactSelectCSS: 'node_modules/react-select/dist/react-select.css',
  src: {
    js: './src/**/*.js?(x)',
    manifest: 'src/manifest.json',
    serviceWorkers: '*service-worker.js',
    offlinePageServiceWorker: 'src/offline-page-service-worker.js',
    client: {
      scss: 'src/client/**/*.scss',
      css: 'src/client/**/*.css',
      entryPoint: 'src/client/index.jsx',
      studentServiceWorker: 'src/client/student/service-worker/service-worker.js',
      volunteerServiceWorker: 'src/client/volunteer/service-worker/service-worker.js',
    },
    server: {
      js: 'src/server/**/*.js?(x)',
      entryPoint: 'src/server/index.js',
    },
  },
  dist: {
    dir: 'dist',
    css: 'dist/styles/',
    manifest: 'dist/manifest.json',
    clientBundle: 'dist/client-bundle.js?(.map)',
    studentServiceWorker: 'student-service-worker.js',
    volunteerServiceWorker: 'volunteer-service-worker.js',
  },
};

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

gulp.task('default', ['lint'], () => gulp.start('compile'));

gulp.task('compile', ['clean'], () => (
  Promise.all([
    gulp.start('sass-styles'),
    gulp.start('move-manifest'),
    gulp.start('move-serviceworkers'),
    gulp.start('webpack'),
  ])
));

gulp.task('lint', () =>
  gulp.src([
    paths.src.js,
    paths.gulpfile,
    paths.webpackfile,
  ])
    .pipe(lec())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('move-manifest', () => (
  gulp.src(paths.src.manifest).pipe(gulp.dest(paths.dist.dir))
));

gulp.task('move-student-sw', () => (
  gulp.src(paths.src.client.studentServiceWorker).pipe(webpackStream({
    output: { filename: paths.dist.studentServiceWorker },
    plugins: [new UglifyJsPlugin()],
  })).pipe(gulp.dest(paths.dist.dir))
));

gulp.task('move-volunteer-sw', () => (
  gulp.src(paths.src.client.volunteerServiceWorker).pipe(webpackStream({
    output: { filename: paths.dist.volunteerServiceWorker },
    plugins: [new UglifyJsPlugin()],
  })).pipe(gulp.dest(paths.dist.dir))
));

gulp.task('move-serviceworkers', ['move-student-sw', 'move-volunteer-sw']);

gulp.task('clean', () => del([
  paths.dist.clientBundle,
  paths.dist.css,
  paths.dist.manifest,
  `${paths.dist.dir}/${paths.dist.studentServiceWorker}`,
  `${paths.dist.dir}/${paths.dist.volunteerServiceWorker}`,
]));

gulp.task('webpack', () => (
  gulp.src(paths.src.client.entryPoint)
    .pipe(webpackStream(webpackConfig))
    .pipe(gzip())
    .pipe(gulp.dest(paths.dist.dir))
));

gulp.task('sass-styles', () => (
  Promise.all([
    gulp.src(paths.src.client.scss)
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(concat('main.css'))
      .pipe(gulp.dest(paths.dist.css)),
    gulp.src(paths.reactSelectCSS)
      .pipe(gulp.dest(paths.dist.css)),
  ])
));

gulp.task('watch', () => (
  Promise.all([
    gulp.watch([paths.src.js, `!${paths.src.serviceWorkers}`], ['webpack']),
    gulp.watch(paths.src.client.scss, ['sass-styles']),
    gulp.watch(paths.src.manifest, ['move-manifest']),
    gulp.watch(paths.src.client.studentServiceWorker, ['move-student-sw']),
    gulp.watch(paths.src.client.volunteerServiceWorker, ['move-volunteer-sw']),
  ])
));

gulp.task(
  'start',
  ['default', 'watch'],
  () => {
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
      script: paths.src.server.entryPoint,
      ignore: ['*'],
    });
  },
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
    script: paths.src.server.entryPoint,
    ext: 'js scss jsx',
    watch: ['src'], // this doesn't seem to be working as expected
    tasks: ['default'],
  });
});
