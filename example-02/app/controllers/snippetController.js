const { Category, Snippet } = require('../models')

module.exports = {
    async store(req, res, next) {
        try {
            const { categoryId } = req.params
            const snippet = await Snippet.create({
                ...req.body,
                CategoryId: categoryId
            })

            req.flash('success', 'Snippet criado com sucesso.')

            return res.redirect(
                `/app/categories/${categoryId}/snippets/${snippet.id}`
            )
        } catch (error) {
            return next(error)
        }
    },
    async show(req, res, next) {
        try {
            const { categoryId, id } = req.params
            const categories = await Category.findAll({
                include: [Snippet],
                where: { userId: req.session.user.id }
            })

            const snippets = await Snippet.findAll({
                where: { categoryId: categoryId }
            })

            const snippet = await Snippet.findById(id)

            return res.render('snippets/show', {
                activeCategory: categoryId,
                categories,
                snippets,
                currentSnippet: snippet
            })
        } catch (error) {
            return next(error)
        }
    },
    async update(req, res, next) {
        try {
            const snippet = await Snippet.findById(req.params.id)

            await snippet.update(req.body)

            req.flash('success', 'Atualizado com sucesso.')

            return res.redirect(
                `/app/categories/${req.params.categoryId}/snippets/${
                    snippet.id
                }`
            )
        } catch (error) {
            return next(error)
        }
    },
    async destroy(req, res, next) {
        console.log('aaa')
        try {
            await Snippet.destroy({ where: { id: req.params.id } })
            req.flash('success', 'Removido com sucesso.')
            return res.redirect(`/app/categories/${req.params.categoryId}`)
        } catch (error) {
            return next(error)
        }
    }
}
