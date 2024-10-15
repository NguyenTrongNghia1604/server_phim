// const express = require('express');
import express from 'express';
// const { createProxyMiddleware } = require('http-proxy-middleware');
import { createProxyMiddleware } from 'http-proxy-middleware';
import bodyParser from 'body-parser';
const app = express();
import cors from 'cors';
// import configCors from './config/cors';
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "https://phimhay-five.vercel.app",
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
);
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://ophim17.cc',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Bỏ tiền tố '/api' khi chuyển tiếp yêu cầu
        
        onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configCors(app);
app.listen(process.env.PORT || 5000, () => {
    console.log('Proxy server is running');
});
