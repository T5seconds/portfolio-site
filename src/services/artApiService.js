import axios from "axios";

const artApiService = {
  endpoint: "https://collectionapi.metmuseum.org/",
};
const returnData = (response) => {
  return response.data;
};

artApiService.getAllObjects = () => {
  const config = {
    method: "GET",
    url: `${artApiService.endpoint}/public/collection/v1/objects`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(returnData);
};

artApiService.getAllDepartments = () => {
  const config = {
    method: "GET",
    url: `${artApiService.endpoint}/public/collection/v1/departments`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(returnData);
};

artApiService.searchObjects = (query) => {
  const config = {
    method: "GET",
    url: `${artApiService.endpoint}/public/collection/v1/search?isHighlight=true&medium=Paintings&q=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(returnData);
};

artApiService.getObject = (objectId) => {
  const config = {
    method: "GET",
    url: `${artApiService.endpoint}/public/collection/v1/objects/${objectId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(returnData);
};

export default artApiService;
