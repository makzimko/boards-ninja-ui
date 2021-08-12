const { createProxyMiddleware } = require('http-proxy-middleware');

const config = require('./config.json');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: config.development.apiHost,
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            }
        })
    );
};