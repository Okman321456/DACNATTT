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

const postBookingInfo = (id, {data})=>{
  const url= `/tickets/book/${id}`;
  return axiosClient.post(url,{data})
}

const login = (data)=>{
  const url = '/auth/login/';
  return axiosClient.post(url,{...data});
}

const APIClient ={
  getDataHomePage,
  getTourDetail,
  getTourList,
  getNewsList,
  getNewsDetail,
  getResultFilter,
  postBookingInfo,
  login
}

export default APIClient;
