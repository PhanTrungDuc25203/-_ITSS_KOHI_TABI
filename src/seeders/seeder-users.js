'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {

                // userName: DataTypes.STRING,
                // password: DataTypes.STRING,
                // name: DataTypes.STRING,
                // email: DataTypes.STRING,
                // address: DataTypes.STRING,
                // phoneNumber: DataTypes.STRING,
                // role: DataTypes.STRING,
                // avatar: DataTypes.STRING,

                userName: 'PhanPiscean',
                password: 'ptd2522003',
                name: 'PhanTrungDuc',
                email: 'phantrungduc2522003@gmail.com',
                address: 'phường Bến Gót, TP.Việt Trì, tỉnh Phú Thọ',
                phoneNumber: '0123456789',
                role: '1',
                avatar: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
