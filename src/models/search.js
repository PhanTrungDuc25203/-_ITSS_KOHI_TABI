'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Search extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Search.belongsTo(models.User, {
                foreignKey: 'uid',
                as: 'userSearchAlias'
            });
            Search.belongsTo(models.CoffeeShop, {
                foreignKey: 'cid',
                as: 'coffeeShopSearch'
            });
        }
    }

    Search.init({
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'Search',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    return Search;
};
