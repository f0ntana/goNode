module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Snippets', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            categoryId: {
                type: DataTypes.INTEGER,
                references: { model: 'Categories', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING
            },
            content: {
                allowNull: false,
                type: DataTypes.TEXT
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        })
    },

    down: (queryInterface) => {
        queryInterface.dropTable('Snippets')
    }
}
