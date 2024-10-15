const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://ophim17.cc',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Bỏ tiền tố '/api' khi chuyển tiếp yêu cầu
    })
);

app.listen(process.env.PORT || 5000, () => {
    console.log('Proxy server is running');
});
