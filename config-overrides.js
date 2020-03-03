const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  externals:{
    'BMap':'BMap',
  },
  fixBabelImports('import', {
    libraryDirectory: 'es',
    libraryName: 'antd',
    style: 'css',
  }),
);
