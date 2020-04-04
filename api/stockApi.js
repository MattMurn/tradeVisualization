module.exports = app => {
  let axios = require('axios');
  // lazy way to create routes.
  /*
    TODO need to add in routes for the sector / index endpoints.
  */
  let routes = ['quote', 'company', 'chart/1m', 'dividends/1y', 'news/last/1', 'advance-stats', 'financials', 'intraday-prices'];
  routes.forEach((route) => {
    return app.get(`/product-source/${route}/:ticker`, (req, res) => {
      axios
        .get(
          `https://cloud.iexapis.com/stable/stock/${req.params.ticker}/${route}?token=${process.env.IEX}`,
        )
        .then((response) => res.json(response.data))
        .catch(() => res.status(500).json('api response not received.'));
    });
  });
};
