const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

// from https://github.com/module-federation/universe/tree/fix_gssp
// const {
//   NextFederationPlugin
// } = require('../../universe/dist/packages/nextjs-mf/src/index');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        remotes: {
          remote1: `remote1@http://localhost:6002/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry_remote1.js`
        },
        filename: 'static/chunks/remoteEntry_host.js',
        exposes: {},
        shared: {
          // whatever else
        }
      })
    );

    return config;
  }
};

module.exports = nextConfig;
