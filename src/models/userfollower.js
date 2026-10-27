'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserFollower extends Model {
        static associate(models) { }
    }
    UserFollower.init(
        {
            followerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            followingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: 'UserFollower',
            tableName: 'UserFollowers',
        }
    );
    return UserFollower;
};
