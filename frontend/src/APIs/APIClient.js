import axiosClient from "./axiosClient";

const getDataHomePage =  () => {
  const url = '/';
  return axiosClient.get(url);
};

const getTourDetail = (id)=>{
  const url = `/tour/${id}`;
  return axiosClient.get(url)
}

const getTourList = (params,region)=>{
  const url = `/${region}`;
  return axiosClient.get(url, {params})
}

const getNewsList = ()=>{
  const url = '/news'
  return axiosClient.get(url)
}
const getNewsDetail = (id)=>{
  const url = `/news/${id}`;
  return axiosClient.get(url)
}

const getResultFilter = (param)=>{
  const url = '/cua-hang';
  return axiosClient.get(url,{params:param});
}
const APIClient ={
  getDataHomePage,
  getTourDetail,
  getTourList,
  getNewsList,
  getNewsDetail,
  getResultFilter
}

export default APIClient;
