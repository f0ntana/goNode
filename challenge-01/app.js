const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const moment = require('moment')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

const checkNameUrl = (req, res, next) => {
    if (req.query.name) {
        return next()
    }
    res.redirect('/')
}

app.set('view engine', 'njk')
app.set('views', path.join(__dirname, 'views'))

app.get('/minor', checkNameUrl, (req, res) => {
    res.render('minor', { name: req.query.name })
})

app.get('/major', checkNameUrl, (req, res) => {
    res.render('major', { name: req.query.name })
})

app.get('/', (req, res) => {
    res.render('main', { nome: 'Felipe' })
})

app.post('/check', (req, res) => {
    const { birthday, name } = req.body
    const age = moment().diff(moment(birthday, 'YYYY/MM/DD'), 'years')

    if (age >= 18) {
        res.redirect(`/major?name=${name}`)
    }

    res.redirect(`/minor?name=${name}`)
})

app.listen(3000, () => console.log('Server Running'))
