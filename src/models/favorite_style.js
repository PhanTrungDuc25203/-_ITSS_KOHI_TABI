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
            Favorite_style.belongsTo(models.User, { foreignKey: 'uid', targetKey: 'id', as: 'favoriteStyle' })
            Favorite_style.hasMany(models.CoffeeShop, {
                foreignKey: 'style',     // Trường trong CoffeeShop trỏ đến Favorite_style
                sourceKey: 'style',      // Trường trong Favorite_style được dùng để match
                as: 'shopIncludeFavoriteStyle' // Alias phải giống nhau ở cả hai phía
            });
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
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });
    return Favorite_style;
};
