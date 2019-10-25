const express = require('express');
const dotenv = require('dotenv');

const db = require('./models');
const cafeRouter = require('./routes/cafe');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cafe', cafeRouter);

app.get('/', (req, res) => {
  res.send('Hello Cafe!');
});

app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found.',
  });
});

app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({
    code: 500,
    message: 'Server Error',
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
