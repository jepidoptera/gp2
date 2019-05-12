module.exports = function(sequelize, DataTypes) {
    var Doge = sequelize.define("Doge", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATE
        },
        visible: {
            type: DataTypes.BOOLEAN
        },
    });
    return Doge;
};
