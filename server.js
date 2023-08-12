const express = require('express');
const mongoose = require('mongoose');
const PORT = 3000;
const apiRoutes = require('./controllers');
const db = require('./config/connection');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

db.once('open', () => {
  app.listen(PORT, () => console.log('Server running on port %s', PORT));
});