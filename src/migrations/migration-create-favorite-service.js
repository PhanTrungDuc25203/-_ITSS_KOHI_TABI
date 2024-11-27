'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_services', {
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            sid: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Favorite_services');
    }
};
