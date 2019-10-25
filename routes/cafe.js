const express = require('express');
const router = express.Router();

const { Cafe, sequelize } = require('../models');

// POST /api/cafe 카페 정보 입력
router.post('/', async (req, res, next) => {
  try {
    const { cafeName, address, latitude, longitude } = req.body;

    const point = { type: 'Point', coordinates: [latitude, longitude] };
    await Cafe.create({ cafeName, address, point });
    res.status(200).json({ code: 200, message: '정보 입력 성공!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: '정보 입력에 실패했습니다.' });
  }
});

// POST /api/cafe/search 위치기반 카페 검색
router.post('/search', async (req, res, next) => {
  try {
    const { latitude, longitude, maxDistance } = req.body;
    const query = `
      SELECT a.*
      FROM (
        SELECT
          id, cafeName, address, point,
          ST_DISTANCE_SPHERE(POINT(:longitude, :latitude), point) AS distance
        FROM cafe_location.cafe
      ) a
      WHERE distance <= :maxDistance
      ORDER BY distance
      LIMIT 10`;
    const result = await sequelize.query(query, {
      replacements: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        maxDistance,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({
      code: 200,
      message: '현재 위치 기반 카페 검색 완료',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: '현재 위치 기반 카페 검색에 실패했습니다.',
    });
  }
});

module.exports = router;
