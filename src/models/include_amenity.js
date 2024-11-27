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
            // Không khai báo mối quan hệ tại đây
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
    });
    return Include_amenity;
};
