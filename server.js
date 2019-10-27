const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

require('dotenv').config();

app.set({ 'content-type': 'application/json; charset=utf-8' });

require('./api/iexRoutes.js')(app);

app.listen(PORT, () => `app is listening on ${PORT}`);
