const currencySchema = SequelizeConnect.define('Currency', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        trim: true
    },
    value: {
        type: Sequelize.TEXT,
        allowNull: false,
        trim: true
    }
}, {
    tableName: 'currency',
});

module.exports = currencySchema;
