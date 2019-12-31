
// frontend routes.
import axios from 'axios';
const getIndexLeaders = async endpoint => {
  let response = await axios(`/product-source/${endpoint}`);
  return response;
}

const getSnapshotData = async ticker => {
  let response = await axios(`/product-source/quote/${ticker}`);
  return response;
}
const getCompanyInfo = async ticker => {
  let response = await axios(`/product-source/company/${ticker}`);
  return response;
}
const getChartData = async ticker => {
  let response = await axios(`/product-source/chart/1m/${ticker}`);
  return response;
}
const getSectorData = async () => {
  let response = await axios('/stock/market/sector-performance');
  return response;
}
export {
  getIndexLeaders,
  getSnapshotData,
  getCompanyInfo,
  getChartData,
  getSectorData
}
