'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_amenities', {
            uid: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            aid: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Favorite_amenities');
    },
};
