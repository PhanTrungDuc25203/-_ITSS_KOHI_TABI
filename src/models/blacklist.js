'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BlackList extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            BlackList.belongsTo(models.User, {
                foreignKey: 'uid',
                targetKey: 'id', // Tham chiếu đến khóa chính của bảng Users
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            });

            BlackList.belongsTo(models.CoffeeShop, {
                foreignKey: 'cid',
                targetKey: 'cid', // Tham chiếu đến khóa chính của bảng Users
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            });
        }
    }

    BlackList.init({
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Black_list',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    return BlackList;
};
