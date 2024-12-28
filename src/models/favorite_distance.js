'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favorite_distance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Favorite_distance.belongsTo(models.User, { foreignKey: 'uid' })
        }
    }

    Favorite_distance.init(
        {
            uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            distance: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Favorite_distance',
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        }
    );

    return Favorite_distance;
};
