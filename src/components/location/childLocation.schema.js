const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');

class ChildLocation extends Model {
}

ChildLocation.init({
  childId: { type: DataTypes.INTEGER, allowNull: false },
  latitude: { type: DataTypes.DOUBLE, allowNull: true },
  longitude: { type: DataTypes.DOUBLE, allowNull: true },
}, {
  sequelize,
  modelName: 'child-location'
});

module.exports = ChildLocation;