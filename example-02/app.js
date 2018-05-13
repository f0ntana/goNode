const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')

const routes = require('./app/routes')
const sessionConfig = require('./config/session')

const app = express()

app.use(express.static(path.resolve('app', 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session(sessionConfig))
app.use(flash())
app.use(methodOverride('_method'))

nunjucks.configure(path.resolve('app', 'views'), {
    autoescape: true,
    express: app
})

app.set('view engine', 'njk')

app.use('/', routes)

app.listen(3000, () => console.log('Server Running'))
