'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Searches', {
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
            cid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        // Thêm ràng buộc duy nhất cho cặp uid và cid
        await queryInterface.addConstraint('Searches', {
            fields: ['uid', 'cid'], // Các cột cần ràng buộc duy nhất
            type: 'unique',
            name: 'unique_uid_cid_constraint' // Tên ràng buộc
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Searches');
    }
};
