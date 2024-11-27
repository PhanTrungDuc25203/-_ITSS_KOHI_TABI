'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Black_list extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            
        }
    }

    Black_list.init({
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

    return Black_list;
};
