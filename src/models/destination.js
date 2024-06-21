module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Destination', {
      url: { type: DataTypes.STRING, allowNull: false },
      httpMethod: { type: DataTypes.ENUM('GET', 'POST', 'PUT'), allowNull: false },
      headers: { type: DataTypes.JSON, allowNull: false },
    });
  };
  