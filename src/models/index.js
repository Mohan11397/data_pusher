const { Sequelize, DataTypes } = require("sequelize");
const config = require("../../config/config.json").development;

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage,
});

const Account = require("./account")(sequelize, DataTypes);
const Destination = require("./destination")(sequelize, DataTypes);

Account.hasMany(Destination, { onDelete: "CASCADE", foreignKey: "accountId" });
Destination.belongsTo(Account, { foreignKey: "accountId" });

module.exports = { sequelize, Account, Destination };
