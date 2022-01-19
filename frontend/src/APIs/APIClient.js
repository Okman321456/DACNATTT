import axiosClient from "./axiosClient";

const getDataHomePage =  () => {
  const url = '/';
  return axiosClient.get(url);
};

const getTourDetail = (id)=>{
  // console.log(typeof id)
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

const createTour = (data) => {
  const url = '/create';
  return axiosClient.post(url, data)
}

const getAllManager = ()=>{
  const url = '/users';
  return axiosClient.get(url);
}

const deleteManager = (id)=>{
  const url = `/users/${id}`;
  return axiosClient.delete(url);
}

const createManager = (data)=>{
  const url = '/users/create';
  return axiosClient.post(url, data)
}

const getManagerById=(id)=>{
  const url = `/users/${id}`;
  return axiosClient.get(url)
}

const updateManager = (id,data)=>{
  const url = `/users/${id}`;
  return axiosClient.put(url, data)
}

const sendFeedback = (id,data)=>{
  const url = `/feedbacks/create/${id}`;
  return axiosClient.post(url, data)
}

const updateTour = (id,data) => {
  const url = `/${id}`;
  return axiosClient.put(url, data)
}

const deleteTour = (id)=>{
  const url = `/${id}`;
  return axiosClient.delete(url);
}

const checkLoginToken = ()=>{
  const url = '/auth/getrole';
  return axiosClient.get(url);
}

const getAllTicket = ()=>{
  const url = 'tickets/listTicket';
  return axiosClient.get(url);
}

const getListTicketsTour = (id)=>{
  const url = `/tickets/tour/${id}`;
  return axiosClient.get(url);
}

const updateStatusTicket = (id, idStatus)=>{
  const url = `/tickets/${id}/${idStatus}`;
  return axiosClient.put(url);
}

const APIClient ={
  getDataHomePage,
  getTourDetail,
  getTourList,
  getNewsList,
  getNewsDetail,
  getResultFilter,
  postBookingInfo,
  login,
  createTour,
  getAllManager,
  deleteManager,
  createManager,
  getManagerById,
  updateManager,
  sendFeedback,
  updateTour,
  deleteTour,
  checkLoginToken,
  getAllTicket,
  getListTicketsTour,
  updateStatusTicket
}

export default APIClient;
