'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('CoffeeShops', 'waiting_time', {
            type: Sequelize.ENUM('1', '2', '3'),
            allowNull: false,
            defaultValue: '1',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('CoffeeShops', 'waiting_time');
    }
};
