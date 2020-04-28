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
  socketId: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'child-session'
});

module.exports = ChildSession;