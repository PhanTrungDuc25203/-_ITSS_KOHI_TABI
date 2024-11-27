'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_distances', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                
            },
            distance: {
                type: Sequelize.DECIMAL(5, 2),
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Favorite_distances');
    },
};
