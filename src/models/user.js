'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            //nơi định nghĩa các mối quan hệ, 1-n,1-1,n-1,n-n?...
            User.hasMany(models.Favorite_amenity, { foreignKey: 'uid', as: 'favoriteAmenity' })
            User.hasMany(models.Favorite_drink, { foreignKey: 'uid', as: 'favoriteDrink' })
            User.hasMany(models.Favorite_style, { foreignKey: 'uid', as: 'favoriteStyle' })
            User.hasMany(models.Favorite_service, { foreignKey: 'uid', as: 'favoriteService' })
            User.belongsToMany(models.CoffeeShop, {
                through: models.Favorite_list,
                foreignKey: 'uid',
                otherKey: 'cid',
                as: 'favoriteCoffeeShops'
            });
        }
    }
    User.init({
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        role: DataTypes.STRING,
        avatar: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'User',
        charset: 'utf8mb4',
        timestamps: false,
        collate: 'utf8mb4_unicode_ci',
    });
    return User;
};