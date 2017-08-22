/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import sass from 'gulp-sass';
import webpackConfig from './webpack.config.babel';


const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  clientSrcScss: 'src/client/styles/sass/*.scss',
  clientSrcCss: 'src/client/styles/css/',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
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

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir)),
);

gulp.task('main', ['lint', 'clean', 'sass-styles'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir)),
);

gulp.task('sass-styles', () => {
  gulp.src(paths.clientSrcScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.clientSrcCss));
});

gulp.task('watch', () => {
  gulp.watch([paths.allSrcJs, paths.clientSrcScss], ['main']);
});

gulp.task('default', ['watch', 'main']);
