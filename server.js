const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

require('./api/iexRoutes.js')(app);

app.listen(PORT, () => `app is listening on ${PORT}`);
