module.exports = function(sequelize, DataTypes) {
    const bridge = sequelize.define("Bridge", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        userID: DataTypes.INTEGER,
        activityID: DataTypes.INTEGER,
        completeByDate: DataTypes.STRING,
        completed: DataTypes.BOOLEAN

    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
       
    return bridge
}