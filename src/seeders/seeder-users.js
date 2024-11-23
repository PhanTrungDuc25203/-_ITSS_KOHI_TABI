'use strict';

const bcrypt = require('bcryptjs'); // Import thư viện bcryptjs
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const saltRounds = 10; // Số vòng salt

        return queryInterface.bulkInsert('Users', [
            {
                userName: 'PhanPiscean',
                password: bcrypt.hashSync('ptd2522003', salt), // Băm mật khẩu
                name: 'PhanTrungDuc',
                email: 'phantrungduc2522003@gmail.com',
                address: 'phường Bến Gót, TP.Việt Trì, tỉnh Phú Thọ',
                phoneNumber: '0123456789',
                role: '1',
                avatar: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userName: 'Phong Sẹo',
                password: bcrypt.hashSync('hoanghaiphong', salt), // Băm mật khẩu
                name: 'Hoàng Hải Phong',
                email: 'phongseo@gmail.com',
                address: 'Bắc Từ Liêm, Hà Nội',
                phoneNumber: '01112223334',
                role: '1',
                avatar: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        // Xóa dữ liệu nếu cần revert
        return queryInterface.bulkDelete('Users', null, {});
    }
};