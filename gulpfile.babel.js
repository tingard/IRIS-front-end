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
// import rename from 'gulp-rename';
import del from 'del';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
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
  manifestFile: 'src/manifest.json',
  offlinePageServiceWorker: 'src/offline-page-service-worker.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  studentServiceWorker: 'src/client/student/service-worker/service-worker.js',
  studentServiceWorkerOut: 'student-service-worker.js',
  volunteerServiceWorker: 'src/client/volunteer/service-worker/service-worker.js',
  volunteerServiceWorkerOut: 'volunteer-service-worker.js',
  distDir: 'dist',
  reactSelectCSS: 'node_modules/react-select/dist/react-select.css',
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

gulp.task('compile', ['clean'], () => ((
  gulp.start('sass-styles'),
  gulp.start('move-manifest'),
  gulp.start('move-serviceworkers'),
  gulp.start('webpack')
)));

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
  gulp.src(paths.manifestFile).pipe(gulp.dest(paths.distDir))
));

gulp.task('move-serviceworkers', () => ((
  // gulp.src(paths.studentServiceWorker)
  //   .pipe(rename(paths.studentServiceWorkerOut))
  //   .pipe(gulp.dest(paths.distDir)),
  gulp.src(paths.volunteerServiceWorker)
    .pipe(webpackStream({
      output: { filename: paths.volunteerServiceWorkerOut },
      plugins: [new UglifyJsPlugin()],
    }))
    .pipe(gulp.dest(paths.distDir))
)));

gulp.task('clean', () => del([
  paths.clientBundle,
  paths.distCssFile,
  paths.distManifestFile,
  `${paths.distDir}/${paths.studentServiceWorkerOut}`,
  `${paths.distDir}/${paths.volunteerServiceWorkerOut}`,
]));

gulp.task('webpack', () => (
  gulp.src(paths.clientEntryPoint)
    .pipe(webpackStream(webpackConfig))
    .pipe(gzip())
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
