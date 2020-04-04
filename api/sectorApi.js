module.exports = (app) => {
  let axios = require('axios');
  // get current, most traded stocks
    app.get(`/stock/market/sector-performance`, (req, res) => {
      axios
        .get(`https://cloud.iexapis.com/stable/stock/market/sector-performance?token=${process.env.IEX}`)
        .then((response) => res.json(response.data))
        .catch((err) => res.status(500).json(err));
    });
};
