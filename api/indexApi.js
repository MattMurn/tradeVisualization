module.exports = (app) => {
  let axios = require('axios');
  // get current, most traded stocks
  const routes = ['mostActive', 'gainers', 'losers', 'iexvolume', 'iexpercent'];
  routes.forEach((route) => {
    app.get(`/product-source/${route}`, (req, res) => {
      axios
        .get(`https://cloud.iexapis.com/stable/stock/market/list/${route}?token=${process.env.IEX}`)
        .then((response) => res.json(response.data))
        .catch((err) => res.status(500).json(err));
    });
  });
};
