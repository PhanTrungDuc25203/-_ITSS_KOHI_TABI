'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CoffeeShop extends Model {
        static associate(models) {
            // Define associations here if needed
            CoffeeShop.belongsTo(models.Favorite_style, {
                foreignKey: 'style',     // Trường trong CoffeeShop trỏ đến Favorite_style
                targetKey: 'style',      // Trường trong Favorite_style kết nối
                as: 'shopIncludeFavoriteStyle' // Alias
            });
            CoffeeShop.hasMany(models.Include_amenity, { foreignKey: 'cid', as: 'includeAmenity' })
            CoffeeShop.hasMany(models.Include_service, { foreignKey: 'cid', as: 'includeService' })

            CoffeeShop.belongsToMany(models.Drink, {
                through: models.Include_drink,
                foreignKey: 'cid',
                otherKey: 'did',
                as: 'drinks'
            });
        }
    }

    CoffeeShop.init({
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        province_vie: {
            type: DataTypes.ENUM(
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
            type: DataTypes.ENUM(
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
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        open_hour: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        close_hour: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        min_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        max_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        description_eng: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        description_jap: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        style: {
            type: DataTypes.ENUM('Vintage', 'Modern', 'Eco-Friendly'),
            allowNull: false,
            defaultValue: 'Modern',
        },
        picture: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'CoffeeShop', // Ensure the model name is correct
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    return CoffeeShop;
};