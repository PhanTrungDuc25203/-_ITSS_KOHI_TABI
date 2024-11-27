'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Drink extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Hiện tại chưa có quan hệ nào cần định nghĩa
        }
    }

    Drink.init({
        did: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name_vi: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name_eng: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name_ja: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Drink',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    return Drink;
};
