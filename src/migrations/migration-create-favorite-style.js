'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_styles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            style: {
                type: Sequelize.ENUM('Vintage', 'Modern', 'Eco-Friendly'),
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Favorite_styles');
    }
};
