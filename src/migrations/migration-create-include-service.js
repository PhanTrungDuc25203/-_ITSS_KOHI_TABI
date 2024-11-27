'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Include_services', {
            cid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            sid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.00
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Include_services');
    }
};
