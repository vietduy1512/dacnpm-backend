const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');

class ChildLocation extends Model {
}

ChildLocation.init({
  childId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  latitude: { type: DataTypes.DOUBLE, allowNull: true },
  longitude: { type: DataTypes.DOUBLE, allowNull: true },
  datetime: { type: DataTypes.DATE }
}, {
  sequelize,
  modelName: 'child-location'
});

module.exports = ChildLocation;