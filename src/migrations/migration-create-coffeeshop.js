'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Coffeeshops', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            province_vie: {
                type: Sequelize.ENUM(
                    'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh',
                    'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau',
                    'Cần Thơ', 'Cao Bằng', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai',
                    'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương',
                    'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang',
                    'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
                    'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình',
                    'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La',
                    'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang',
                    'TP Hồ Chí Minh', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
                ),
                allowNull: false,
            },
            province_jap: {
                type: Sequelize.ENUM(
                    'アンザン', 'バリア=ブンタウ', 'バックザン', 'バックカン', 'バックリエウ', 'バクニン',
                    'ベンチェ', 'ビンディン', 'ビンズオン', 'ビンフオック', 'ビントゥアン', 'カマウ',
                    'カントー', 'カオバン', 'ダナン', 'ダクラク', 'ダクノン', 'ディエンビエン', 'ドンナイ',
                    'ドンタップ', 'ザライ', 'ハザン', 'ハナム', 'ハノイ', 'ハティン', 'ハイズオン',
                    'ハイフォン', 'ハウザン', 'ホアビン', 'フンイエン', 'カンホア', 'キエンザン',
                    'コンツム', 'ライチャウ', 'ラムドン', 'ランソン', 'ラオカイ', 'ロンアン', 'ナムディン',
                    'ゲアン', 'ニンビン', 'ニントゥアン', 'フート', 'フーイエン', 'クアンビン',
                    'クアンナム', 'クアンガイ', 'クアンニン', 'クアンチ', 'ソクチャン', 'ソンラ',
                    'タイニン', 'タイビン', 'タイグエン', 'タインホア', 'トゥアティエンフエ', 'ティエンザン',
                    'ホーチミン市', 'チャビン', 'トゥエンクアン', 'ビンロン', 'ビンフック', 'イエンバイ'
                ),
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            open_hour: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            close_hour: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            min_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            max_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            description_eng: {
                type: Sequelize.TEXT,
                allowNull: true, // DEFAULT NULL
            },
            description_jap: {
                type: Sequelize.TEXT,
                allowNull: true, // DEFAULT NULL
            },
            style: {
                type: Sequelize.ENUM('Vintage', 'Modern', 'Eco-Friendly'),
                allowNull: false,
                defaultValue: 'Modern',
            },
            picture: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Coffeeshops');
    },
};
