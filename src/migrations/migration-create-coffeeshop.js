'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Coffeeshops', {
            cid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            open_hour: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            close_hour: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            min_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            max_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            description_eng: {
                type: Sequelize.TEXT,
                allowNull: true, // DEFAULT NULL
            },
            description_jap: {
                type: Sequelize.TEXT,
                allowNull: true, // DEFAULT NULL
            },
            style: {
                type: Sequelize.ENUM('Vintage', 'Modern', 'Eco-Friendly'),
                allowNull: false,
                defaultValue: 'Modern',
            },
            picture: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Coffeeshops');
    },
};
