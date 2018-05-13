const express = require('express')

const router = express.Router()

const authMiddleware = require('./middlewares/auth')
const guestMiddleware = require('./middlewares/guest')

const authController = require('./controllers/authController')
const dashboardController = require('./controllers/dashboardController')
const categoryController = require('./controllers/categoryController')
const snippetController = require('./controllers/snippetController')

router.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success')
    res.locals.flashError = req.flash('error')
    next()
})

/**
 * Auth
 */
router.get('/', guestMiddleware, authController.signin)
router.get('/signup', guestMiddleware, authController.signup)
router.get('/signout', authController.signout)
router.post('/register', authController.register)
router.post('/authenticate', authController.authenticate)

/**
 * Dash
 */
router.use('/app', authMiddleware)
router.get('/app/dashboard', dashboardController.index)

/**
 * Categorias
 */
router.get('/app/categories/:id', categoryController.show)
router.post('/app/categories/create', categoryController.store)

/**
 * Snippet
 */
router.get('/app/categories/:categoryId/snippets/:id', snippetController.show)
router.post(
    '/app/categories/:categoryId/snippets/create',
    snippetController.store
)
router.put('/app/categories/:categoryId/snippets/:id', snippetController.update)
router.delete(
    '/app/categories/:categoryId/snippets/:id',
    snippetController.destroy
)

/**
 * Errors
 */
router.use((req, res) => res.render('errors/404'))
router.use((error, req, res, _next) => {
    res.status(error.status || 500)
    return res.render('errors/index', {
        message: error.message,
        error: process.env.NODE_ENV === 'production' ? {} : error
    })
})

module.exports = router
