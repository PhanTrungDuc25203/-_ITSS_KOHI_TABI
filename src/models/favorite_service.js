'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Favorite_service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Favorite_service.belongsTo(models.User, { foreignKey: 'uid', targetKey: 'id', as: 'favoriteService' })
            Favorite_service.hasMany(models.Include_service, {
                foreignKey: 'sid',
                sourceKey: 'sid',
                as: 'shopIncludeFavoriteService'
            });
        }
    }
    Favorite_service.init({
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Favorite_service',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });
    return Favorite_service;
};
