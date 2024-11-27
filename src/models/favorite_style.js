'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Favorite_style extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Không khai báo mối quan hệ tại đây
        }
    }
    Favorite_style.init({
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        style: {
            type: DataTypes.ENUM('Vintage', 'Modern', 'Eco-Friendly'),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Favorite_style',
    });
    return Favorite_style;
};
