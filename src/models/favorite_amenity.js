'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FavoriteAmenity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Định nghĩa mối quan hệ với các bảng khác

            // FavoriteAmenity thuộc về User
            this.belongsTo(models.User, {
                foreignKey: 'uid', // Tham chiếu đến khóa ngoài UID
                targetKey: 'id', // Tham chiếu đến khóa chính của bảng Users
            });

            // FavoriteAmenity thuộc về Amenity
            this.belongsTo(models.Amenity, {
                foreignKey: 'aid', // Tham chiếu đến khóa ngoài AID
                targetKey: 'aid', // Tham chiếu đến khóa chính của bảng Amenities
            });
        }
    }

    FavoriteAmenity.init({
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

    return FavoriteAmenity;
};
