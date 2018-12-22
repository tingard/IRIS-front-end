module.exports = {
  output: {
    html: {
      title: 'Grapheel IRIS',
    },
  },
  pages: {
    index: {
      entry: './src/client/main/index.jsx',
      title: 'Grapheel IRIS',
    },
    'volunteer/index': {
      entry: './src/client/volunteer/index.jsx',
      title: 'Grapheel IRIS',
    },
    'student/index': {
      entry: './src/client/student/index.jsx',
      title: 'Grapheel IRIS',
    },
    // 'licence-owner': {
    //   entry: './src/client/licence-owner/index.jsx',
    //   title: 'Grapheel IRIS',
    // },
  },
  devServer: {
    hotEntries: ['index', 'student/index', 'volunteer/index'], // , 'licence-owner/index'],
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/login.*?$/, to: '/index.html' },
        { from: /^\/create.*?$/, to: '/index.html' },
        { from: /^\/student.*?$/, to: '/student/index.html' },
        { from: /^\/volunteer.*?$/, to: '/volunteer/index.html' },
      ],
    },
  },
  chainWebpack: (config) => {
    // add the service workers
    config.entry('student/service-worker')
      .add('./src/client/student/service-worker/service-worker.js')
      .end();
    config.entry('volunteer/service-worker')
      .add('./src/client/volunteer/service-worker/service-worker.js')
      .end();
    // this might impact global config, not just service workers, but ahh well
    config.output
      .filename('[name].bundle.js')
      // workaround for "window is not defined"
      .globalObject('this');
    return null;
  },
};
