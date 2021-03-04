require('dotenv').config();


const express = require('express');
const router = require('./routes');
const cors = require('cors');
const errHandler = require('./middleware/errorhandler.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})