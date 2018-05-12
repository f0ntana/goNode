const { Category, Snippet } = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const categories = await Category.findAll({
                include: [Snippet],
                where: { userId: req.session.user.id }
            })

            return res.render('dashboard/index', { categories })
        } catch (error) {
            return next(error)
        }
    }
}
