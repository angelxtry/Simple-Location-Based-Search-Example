module.exports = (sequelize, DataTypes) => {
  const Cafe = sequelize.define(
    'cafe',
    {
      cafeName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      point: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  return Cafe;
};
