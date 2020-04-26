const express = require('express')
const axios = require('axios')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3002

function createClient() {
  const client = axios.create({
    timeout: 1000,
    baseURL: 'http://tanhua.development.iredium-local.internal:3000',
    headers: {
      'User-Agent': 'ecommerce_web_app.development.iredium-local.internal'
    }
  })
  return client
}

app.use(morgan('combined'))

app.get('/', async (req, res) => {
  const client = createClient()
  try {
    const { data: apiResponse } = await client.get('/ecommerce_api')
    res.send(`Message from ${apiResponse.service}: ${apiResponse.message}`)
  } catch (e) {
    res.send(e.message)
  }
})

app.listen(port, () => console.log(`Ecommerce Web App listening at http://localhost:${port}`))
