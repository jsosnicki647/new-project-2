module.exports = function(sequelize, DataTypes) {
  const activities = sequelize.define("Activities", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    activityDescription: DataTypes.TEXT,
    category: DataTypes.TEXT
  },
  {
      timestamps: false
  });

  return activities
}