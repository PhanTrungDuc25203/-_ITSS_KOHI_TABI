'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Favorite_drink extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Ví dụ: một drink có thể thuộc về nhiều người dùng (1-n), bạn có thể khai báo mối quan hệ ở đây
        }
    }
    Favorite_drink.init({
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        did: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Favorite_drink',
    });
    return Favorite_drink;
};
