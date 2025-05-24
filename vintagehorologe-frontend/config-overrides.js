module.exports = function override(config, env) {
  config.ignoreWarnings = [
    {
      module: /node_modules/,
      message: /source map/,
    },
  ];

  config.devServer = {
    ...config.devServer,
    allowedHosts: 'all',
  };

  return config;
};
