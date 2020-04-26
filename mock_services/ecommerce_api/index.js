const express = require('express')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3001

app.use(morgan('combined'))

app.get('/', (req, res) => res.json({
  service: 'ecommerce_api',
  message: 'Hello World!'
}))

app.listen(port, () => console.log(`Ecommerce API listening at http://localhost:${port}`))
