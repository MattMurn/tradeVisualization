module.exports = (app) => {
  let axios = require('axios');
  let routes = ['quote', 'company', 'chart/1m', 'dividends/1y', 'news/last/1'];

  app.get(`/product-source/mostActive`, (req, res) => {
    axios
      .get(`https://sandbox.iexapis.com/v1/stock/market/list/mostactive?token=${process.env.IEX}`)
      .then((response) => res.json(response.data))
      .catch((err) => res.status(500).json(err));
  });

  routes.forEach((route) => {
    return app.get(`/product-source/${route}/:ticker`, (req, res) => {
      axios
        .get(
          `https://sandbox.iexapis.com/v1/stock/${req.params.ticker}/${route}?token=${process.env.IEX}`,
        )
        .then((response) => res.json(response.data))
        .catch(() => res.status(500).json('api response not received.'));
    });
  });
};
