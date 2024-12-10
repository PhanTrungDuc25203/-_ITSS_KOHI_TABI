'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favorite_amenity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Favorite_amenity.belongsTo(models.User, { foreignKey: 'uid', targetKey: 'id', as: 'favoriteAmenity' })
            Favorite_amenity.hasMany(models.Include_amenity, {
                foreignKey: 'aid',
                sourceKey: 'aid',
                as: 'shopIncludeFavoriteAmenity'
            });
        }
    }

    Favorite_amenity.init({
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        aid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Favorite_amenity',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    return Favorite_amenity;
};
