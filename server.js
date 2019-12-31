const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 4000;

require('dotenv').config();

app.use(morgan('combined'));
app.set({ 'content-type': 'application/json; charset=utf-8' });

require('./api/stockApi.js')(app);
require('./api/indexApi.js')(app);
require('./api/sectorApi.js')(app);

app.listen(PORT, () => `app is listening on ${PORT}`);
