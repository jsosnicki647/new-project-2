module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    userName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    lat: DataTypes.DECIMAL,
    lon: DataTypes.DECIMAL,
    surveyQ1: DataTypes.INTEGER,
    surveyQ2: DataTypes.INTEGER,
    surveyQ3: DataTypes.INTEGER,
    surveyQ4: DataTypes.INTEGER,
    surveyQ5: DataTypes.INTEGER,
  },
  {
    timestamps: false
  });

  return users
};
