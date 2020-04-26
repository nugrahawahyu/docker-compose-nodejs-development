const express = require('express')
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
const port = process.env.PORT || 3000

const ecommerceApiProxy = createProxyMiddleware({
  target: 'http://ecommerce_api.development.iredium-local.internal:3001', // target host
  changeOrigin: true, // needed for virtual hosted sites,
  pathRewrite: {
    '^/ecommerce_api': '/',
  },
});

app.use(morgan('combined'))

app.use('/ecommerce_api', ecommerceApiProxy)

app.listen(port, () => console.log(`Tanhua listening at http://localhost:${port}`))
