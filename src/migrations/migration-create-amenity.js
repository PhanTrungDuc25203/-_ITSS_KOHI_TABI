'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Amenities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            aid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name_eng: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            name_jap: {
                type: Sequelize.STRING(255),
                allowNull: false,
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
        await queryInterface.dropTable('Amenities');
    },
};
