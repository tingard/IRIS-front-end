const paths = {
  gulpfile: 'gulpfile.babel.js',
  webpackfile: 'webpack.config.babel.js',
  src: {
    js: './src/**/*.js?(x)',
    manifest: 'src/manifest.json',
    serviceWorkers: '**/*service-worker.js',
    offlinePageServiceWorker: 'src/client/common-resources/offline-page-service-worker.js',
    client: {
      main: {
        entryPoint: 'src/client/main/index.jsx',
        scss: 'src/client/main/styles/index.scss',
        css: 'src/client/main/**/*.css',
      },
      volunteer: {
        entryPoint: 'src/client/volunteer/index.jsx',
        scss: 'src/client/volunteer/styles/index.scss',
        css: 'src/client/volunteer/**/*.css',
        serviceWorker: 'src/client/volunteer/service-worker/service-worker.js',
      },
      student: {
        entryPoint: 'src/client/student/index.jsx',
        scss: 'src/client/student/**/*.scss',
        css: 'src/client/student/**/*.css',
        serviceWorker: 'src/client/student/service-worker/service-worker.js',
      },
      licenceOwner: {
        entryPoint: 'src/client/licence-owner/index.jsx',
        scss: 'src/client/licence-owner/**/*.scss',
        css: 'src/client/licence-owner/**/*.css',
      },
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
    mainBundle: 'dist/iris-bundle.js?(.map)',
    studentBundle: 'dist/student-bundle.js?(.map)',
    volunteerBundle: 'dist/volunteer-bundle.js?(.map)',
    studentServiceWorker: 'student-service-worker.js',
    volunteerServiceWorker: 'volunteer-service-worker.js',
  },
};

export default paths;
