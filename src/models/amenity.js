'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Amenity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here if needed.
        }
    }

    Amenity.init({
        aid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, // Defines this field as the primary key
        },
        name_eng: {
            type: DataTypes.STRING(255), // Maximum length of 255
            allowNull: false,
        },
        name_jap: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Amenity',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    return Amenity;
};
