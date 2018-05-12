module.exports = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Sessions', {
            sid: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING
            },
            expires: {
                type: DataTypes.DATE
            },
            data: {
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
        queryInterface.dropTable('Sessions')
    }
}
