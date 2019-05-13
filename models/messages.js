module.exports = function(sequelize, DataTypes) {
    var Messages = sequelize.define("Messages", {
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recipient: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    // // do createdAt in unix time
    // Messages.beforeCreate((record, options) => {
    //     record.createdAt = Math.floor(Date.now() / 1000);
    // });
    return Messages;
};
