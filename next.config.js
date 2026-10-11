const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      // @sls-testing/core imports randomUUID from Node's crypto; in the browser use the Web Crypto API instead.
      config.resolve.alias = { ...config.resolve.alias, crypto: path.resolve(__dirname, "lib/browser-crypto.js") };
    }
    return config;
  },
};
