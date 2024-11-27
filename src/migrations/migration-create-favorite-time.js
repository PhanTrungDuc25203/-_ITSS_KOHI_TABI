'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_times', {
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
            time: {
                type: Sequelize.TIME,
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Favorite_times');
    }
};
