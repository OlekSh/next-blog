/** @type {import('next').NextConfig} */

const  { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: 'Sany',
    mongodb_password: 'admin',
    mongodb_clustername: 'cluster0',
    mongodb_database: 'my-site',
  }
}

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'Sany',
        mongodb_password: 'admin',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site-dev',
      }
    }
  }
  return nextConfig
}
