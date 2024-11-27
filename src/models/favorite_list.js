'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Favorite_list extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Favorite_list.init({
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Favorite_list',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });
    return Favorite_list;
};
