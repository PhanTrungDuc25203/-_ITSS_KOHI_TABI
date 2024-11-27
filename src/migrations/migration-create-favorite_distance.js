'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_distances', {
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users', // Tham chiếu đến bảng Users
                    key: 'id', // Khóa chính của bảng Users
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
