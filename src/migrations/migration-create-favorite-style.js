'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_styles', {
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
