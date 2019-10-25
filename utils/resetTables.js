const { sequelize, Cafe } = require('../models');

const dropCafeTable = async () => {
  await Cafe.drop().then(() => {
    console.log(`Cafe table delete.`);
  });
};

const resetTables = async () => {
  await dropCafeTable();
  await sequelize.sync();
  await sequelize.close();
};

resetTables();
