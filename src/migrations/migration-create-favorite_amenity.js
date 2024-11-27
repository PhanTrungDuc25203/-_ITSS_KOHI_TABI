'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorite_amenities', {
            uid: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users', // Tham chiếu đến bảng Users
                    key: 'id', // Khóa chính của bảng Users
                },
                onUpdate: 'CASCADE', // Cập nhật khi khóa chính thay đổi
                onDelete: 'CASCADE', // Xóa khi người dùng bị xóa
            },
            aid: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Amenities', // Tham chiếu đến bảng Amenities
                    key: 'aid', // Khóa chính của bảng Amenities
                },
                onUpdate: 'CASCADE', // Cập nhật khi khóa chính thay đổi
                onDelete: 'CASCADE', // Xóa khi tiện ích bị xóa
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Favorite_amenities');
    },
};
