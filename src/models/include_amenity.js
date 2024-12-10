'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Include_amenity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Include_amenity.belongsTo(models.Favorite_amenity, {
                foreignKey: 'aid',
                targetKey: 'aid',
                as: 'shopIncludeFavoriteAmenity'
            });
            Include_amenity.belongsTo(models.CoffeeShop, {
                foreignKey: 'cid',
                targetKey: 'cid',
                as: 'includeAmenity'
            });
        }
    }
    Include_amenity.init({
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        aid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        }
    }, {
        sequelize,
        modelName: 'Include_amenity',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });
    return Include_amenity;
};
