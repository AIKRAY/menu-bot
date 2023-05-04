// this file works only for development
// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.API_URL,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
