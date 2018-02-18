
// var wallabify = require("wallabify");

// var wallabyPostprocessor = wallabify({});


var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'node_modules/zone.js/dist/zone.js',
    'config/spec-bundle.js',
    'src/**/*spec.js'
  ],

  module: {
    loaders: [
      // if you use templateUrl in your components and want to inline your templates uncomment the below line
      {test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /karma-require/, loader: 'null'}
    ]
  }
});

module.exports = function (w) {

  return {
    files: [
      {pattern: 'src/app/services/DropdownMenuTab.service.ts', load: true, },
    ],
    tests: [
      { pattern: './test/DropdownMenuTab.spec.ts',  load:true}
    ],

    testFramework: 'jasmine',
    compilers: {
      '**/*.ts': w.compilers.typeScript({
        emitDecoratorMetadata: true,
        experimentalDecorators: true
      })
    },
    debug: true,
    env: {
      type: 'node'
    }
  };
};