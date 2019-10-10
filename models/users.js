module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define("Users", {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    userName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    lat: DataTypes.DECIMAL,
    lon: DataTypes.DECIMAL,
    zip: DataTypes.TEXT
  },
  {
    timestamps: false
  });

  return users
};
