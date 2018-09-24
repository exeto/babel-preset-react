'use strict';

module.exports = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';
  const isTest = env === 'test';

  const config = {
    presets: [
      [
        require('@babel/preset-env').default,
        {
          useBuiltIns: 'usage',
          modules: isTest ? 'commonjs' : false,
          targets: isTest ? { node: 'current' } : {},
        },
      ],
      [
        require('@babel/preset-react').default,
        {
          development: isDevelopment || isTest,
          useBuiltIns: true,
        },
      ],
    ],
    plugins: [
      [
        require('@babel/plugin-proposal-class-properties').default,
        { loose: true },
      ],
      [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: 2,
          regenerator: false,
          useESModules: isDevelopment || isProduction,
        },
      ],
    ],
  };

  if (isProduction) {
    config.plugins.push([
      require('babel-plugin-transform-react-remove-prop-types').default,
      { removeImport: true },
    ]);
  }

  return config;
};
