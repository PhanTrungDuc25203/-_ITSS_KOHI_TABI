'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Hiện tại chưa có quan hệ nào cần định nghĩa
        }
    }

    Service.init({
        sid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name_eng: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name_jap: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Service',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    return Service;
};
