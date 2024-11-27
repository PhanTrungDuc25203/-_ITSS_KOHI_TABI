'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            //nơi định nghĩa các mối quan hệ, 1-n,1-1,n-1,n-n?...

        }
    }
    User.init({
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        role: DataTypes.STRING,
        avatar: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });
    return User;
};