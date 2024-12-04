'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Drinks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Drinks');
    },
};
