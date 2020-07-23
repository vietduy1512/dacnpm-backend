const { DataTypes, Model } = require('sequelize');
const sequelize = require('@infrastructure/database');
const User = require('./user.schema');

class Child extends Model {}

Child.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    parentId: { type: DataTypes.INTEGER, allowNull: false },
    deviceToken: { type: DataTypes.STRING },
    fullname: {
      type: DataTypes.STRING,
      defaultValue: 'No',
      validate: {
        len: [0, 32],
      },
    },
    circle: { type: DataTypes.ARRAY(DataTypes.JSON) },
    installedApps: { type: DataTypes.ARRAY(DataTypes.STRING) },
    battery: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'child',
  }
);

Child.belongsTo(User, {
  foreignKey: 'parentId',
});
User.hasMany(Child, {
  foreignKey: 'parentId',
});

module.exports = Child;
