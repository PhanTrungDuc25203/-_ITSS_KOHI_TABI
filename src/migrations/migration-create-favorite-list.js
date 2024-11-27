'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_lists', {
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cid: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Favorite_lists');
    }
};
