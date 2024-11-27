'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FavoriteDistance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define association here
            FavoriteDistance.belongsTo(models.User, {
                foreignKey: 'uid', // Tham chiếu đến khóa ngoài UID
                targetKey: 'id', // Tham chiếu đến khóa chính của bảng Users
            });
        }
    }

    FavoriteDistance.init(
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
            tableName: 'Favorite_distances', // Đặt tên bảng rõ ràng
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        }
    );

    return FavoriteDistance;
};
