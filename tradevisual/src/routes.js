
// frontend routes.
import axios from 'axios';

const getSnapshotData = async ticker => {
  let response = await axios(`/product-source/quote/${ticker}`);
  return response;
}
const getCompanyInfo = async ticker => {
  let response = await axios(`/product-source/company/${ticker}`);
  return response;
}
export {
  getSnapshotData,
  getCompanyInfo
}
