'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Services', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name_eng: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            name_jap: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Services');
    },
};
