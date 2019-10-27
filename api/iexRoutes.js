
module.exports = app => {
  let axios = require('axios');
  let routes = ['quote', 'company', 'chart/1m', 'dividends/1y', 'news/last/1'];

  routes.forEach(route => {
    return app.get(`/product-source/${route}/:ticker`,(req, res) => {
      axios.get(`https://sandbox.iexapis.com/stable/stock/${req.params.ticker}/${route}?token=${process.env.IEX}`)
      .then(response => res.json(response.data))
      .catch(error => res.status(500).json("api response not received."));
    })
  })
};
