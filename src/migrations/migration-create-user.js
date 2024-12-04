'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        //tên bảng viết hoa hay thường thì mysql tự chuyển thành thường
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            // userName: DataTypes.STRING,
            // password: DataTypes.STRING,
            // name: DataTypes.STRING,
            // email: DataTypes.STRING,
            // address: DataTypes.STRING,
            // phoneNumber: DataTypes.STRING,
            // role: DataTypes.STRING,
            // avatar: DataTypes.STRING,
            userName: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.BLOB('long')
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};