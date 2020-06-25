const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const testConnect = require('./modules/testConnect')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/api/getPerson', testConnect)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))