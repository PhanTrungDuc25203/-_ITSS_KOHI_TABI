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
            // Không khai báo mối quan hệ tại đây
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
    });
    return Favorite_list;
};
