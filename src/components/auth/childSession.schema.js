const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database');

class ChildSession extends Model {
}

ChildSession.init({
  parentEmailAddress: { type: DataTypes.STRING, allowNull: false, unique: true, trim: true,
    validate: {
      len: [4,64]
    }
  },
  childSocketId: { type: DataTypes.STRING, allowNull: false },
  parentSocketId: { type: DataTypes.STRING, allowNull: true },
}, {
  sequelize,
  modelName: 'child-session'
});

module.exports = ChildSession;