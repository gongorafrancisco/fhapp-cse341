const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const testConnect = require('./modules/testConnect')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/math', (req, res) => {
    res.render('pages/results', handleMath(req));
  })
  .get('/math_service', (req, res) => {
    const obj = JSON.stringify(handleMath(req));
    res.send(obj);
  })
  .get('/getRate', (req, res) => {
    res.render('pages/postalrate', calculatePostage(req))
  })
  .get('/api/customers', testConnect)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))