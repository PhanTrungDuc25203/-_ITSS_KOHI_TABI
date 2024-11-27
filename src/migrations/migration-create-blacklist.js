'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Black_lists', {
            uid: {
                allowNull: false,
                type: Sequelize.INTEGER,
                
            },
            cid: {
                allowNull: false,
                type: Sequelize.INTEGER,
                
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Black_lists');
    },
};
