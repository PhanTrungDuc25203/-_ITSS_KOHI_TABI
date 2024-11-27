'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Black_lists', {
            uid: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users', // Tên bảng Users
                    key: 'id', // Khóa chính trong bảng Users
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            cid: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Coffeeshops', // Tên bảng CoffeeShops
                    key: 'cid', // Khóa chính trong bảng CoffeeShops
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Black_lists');
    },
};
