
// frontend routes.
import axios from 'axios';

const getMostActive = async () => {
  let response = await axios('/product-source/mostActive');
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
export {
  getMostActive,
  getSnapshotData,
  getCompanyInfo
}
