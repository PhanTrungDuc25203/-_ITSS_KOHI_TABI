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
            Favorite_drink.belongsTo(models.User, { foreignKey: 'uid', targetKey: 'id', as: 'favoriteDrink' })
            Favorite_drink.hasMany(models.Include_drink, {
                foreignKey: 'did',
                sourceKey: 'did',
                as: 'shopIncludeFavoriteDrink'
            });
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
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });
    return Favorite_drink;
};
