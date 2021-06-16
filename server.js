const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const routes = require('./routes/routes');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config({ path: 'config/config.env' });

const app = express();
app.use(morgan('tiny'));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("<h1>Welcome To Smaadhaan Server API</h1>");
});

connectDB().then(() => {
  const server = app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`.green.italic.bold)
  );
});
