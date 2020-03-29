const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryDirectory: 'es',
    libraryName: 'antd',
    style: 'css',
  }),
);
