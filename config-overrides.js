const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
  };
  
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ];
  
  return config;
};

module.exports.devServer = function(configFunction) {
  return function(proxy, allowedHost) {
    const config = configFunction(proxy, allowedHost);
    
    // VPN-friendly settings
    config.host = '0.0.0.0';
    config.allowedHosts = 'all';
    
    return config;
  };
};
