'use strict';
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const files = [
      'sampleData00.json',
      'sampleData01.json',
      'sampleData02.json',
      'sampleData03.json',
      'sampleData04.json',
      'sampleData05.json',
      'sampleData06.json',
      'sampleData07.json',
      'sampleData08.json',
      'sampleData09.json',
    ];
    for (const file of files) {
      const filePath = path.join(__dirname, '..', 'samples', file);
      const cafes = require(filePath)['documents'].map(s => {
        const n = {};
        n.cafeName = s.place_name;
        n.address = s.road_address_name;
        n.point = Sequelize.fn('ST_GeomFromText', `POINT(${s.x} ${s.y})`);
        n.createdAt = new Date();
        n.updatedAt = new Date();
        return n;
      });
      await queryInterface.bulkInsert('cafe', cafes, {});
    }
    return;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cafe', null, {});
  },
};
