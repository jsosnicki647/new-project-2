module.exports = function(sequelize, DataTypes) {
    const bridge = sequelize.define("Bridge", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        userID: DataTypes.TEXT,
        activityID: DataTypes.INTEGER,
        completeByDate: DataTypes.STRING,
        completed: DataTypes.BOOLEAN,
        completedOnDate: DataTypes.STRING
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
       
    return bridge
}