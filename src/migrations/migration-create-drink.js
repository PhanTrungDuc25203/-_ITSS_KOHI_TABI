'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Drinks', {
            did: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name_vi: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            name_eng: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            name_ja: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            price: {
                allowNull: false,
                type: Sequelize.DECIMAL(10, 2),
            },
            picture: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Drinks');
    },
};
