const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');
const User = require('../users/user.schema');

class OTPToken extends Model {
}

OTPToken.init({
  parentId: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'otp-token'
});

User.hasOne(OTPToken, {
  foreignKey: 'parentId'
});

module.exports = OTPToken;