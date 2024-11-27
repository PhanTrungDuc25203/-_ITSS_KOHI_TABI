'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CoffeeShop extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here if needed
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
    }, {
        sequelize,
        modelName: 'Coffeeshop',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    return CoffeeShop;
};
