const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');

class OTPToken extends Model {
}

OTPToken.init({
  parentId: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'otp-token'
});

module.exports = OTPToken;