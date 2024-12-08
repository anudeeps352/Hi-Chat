require('dotenv').config();

const config = {
  apiUrl: process.env.API_URL,
  dbUrl: process.env.DB_URL,
};

module.exports = config;
