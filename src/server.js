const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
import cors from 'cors';
import configCors from './config/cors';
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://ophim17.cc',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Bỏ tiền tố '/api' khi chuyển tiếp yêu cầu
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.REACT_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
);
configCors(app);
app.listen(process.env.PORT || 5000, () => {
    console.log('Proxy server is running');
});
