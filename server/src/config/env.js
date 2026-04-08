require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no esta definido');
}

module.exports = {
  PORT: process.env.PORT
};