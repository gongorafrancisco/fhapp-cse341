const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const getPerson = require('./modules/getPerson')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/api/person/:id', getPerson)
  .get('/api/person/', getPerson)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))