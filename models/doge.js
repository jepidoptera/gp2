module.exports = function(sequelize, DataTypes) {
    var Doges = sequelize.define("Doges", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthdate: {
        type: DataTypes.DATE
      },
      sex: {
        type: DataTypes.STRING
      },
      imgURL: {
        type: DataTypes.STRING
      },
      visible: {
        type: DataTypes.BOOLEAN
      }
    });
    return Doges;
};
