const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/sequelize");

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.STRING, defaultValue: null },
    image: { type: DataTypes.STRING, defaultValue: null },
  },
  { sequelize },
);

module.exports = { Profile };
