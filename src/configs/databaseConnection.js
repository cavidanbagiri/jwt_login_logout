// import sequelize and create connection
(async () => {
    const { sequelize } = require('../../models');
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();