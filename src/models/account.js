module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Account', {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      accountId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true },
      accountName: { type: DataTypes.STRING, allowNull: false },
      appSecretToken: { type: DataTypes.STRING, defaultValue: () => require('crypto').randomBytes(16).toString('hex') },
      website: { type: DataTypes.STRING, allowNull: true },
    });
  };
  