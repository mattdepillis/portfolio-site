// const withTM = require('next-transpile-modules')(['static-tweets']);

// module.exports = withTM({});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['pbs.twimg.com']
  }
})
