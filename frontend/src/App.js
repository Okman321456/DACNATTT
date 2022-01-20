import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import Home from './page/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import TourList from './page/TourList';
import NewsList from './page/NewsList';
import { Route, Routes, useLocation } from 'react-router-dom';
import TourDetail from './page/TourDetail';
import NewsDetail from './page/NewsDetail';
// import PaymentConfirmation from './page/PaymentConfirmation';
import { actions, useStore } from './store';
import Result from './page/Result'
import LoginForm from '../src/components/Forms/LoginForm';
import BookingForm from './components/BookingForm/BookingForm';
import OrderSuccessfully from './components/Notification/OrderSuccessfully';
import AddTour from './page/AddTour'
import ManagerList from '../src/components/Table/ManagerList';
import Manager from '../src/components/Forms/Manager';
import UpdateManager from './components/Forms/UpdateManager';
import UpdateTour from './page/UpdateTour';
import TourListTable from './components/Table/TourListTable';
import SpinnerLoading from './components/SpinnerLoading/SpinnerLoading';
import APIClient from './APIs/APIClient';
import ManageTickets from './page/ManageTickets';
import ManageTicketsTour from './page/ManageTicketsTour';
import StatisticPerMonth from './page/StatisticPerMonth';

function App() {
  const [state, dispatch] = useStore();
  

  return (
    <div className="App">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/mien-bac" exact element={<TourList region="BẮC" url="mien-bac" />} />
        <Route path="/mien-trung" exact element={<TourList region="TRUNG" url="mien-trung" />} />
        <Route path="/mien-nam" exact element={<TourList region="NAM" url="mien-nam" />} />
        <Route path="/tour/:id" exact element={<TourDetail />} />
        <Route path="/tin-tuc" element={<NewsList />} />
        <Route path="/tin-tuc/:id" element={<NewsDetail />} />
        {/* <Route path="/payment" element={<PaymentConfirmation/>} /> */}
        <Route path="/cua-hang" element={<Result />} />
        <Route path="/dat-hang" element={<BookingForm />} />
        <Route path="/dang-nhap" element={<LoginForm />} />
        <Route path="/them-tour" element={<AddTour />} />
        <Route path="/quan-li-nhan-vien" element={<ManagerList />} />
        <Route path="/them-nhan-vien" element={<Manager />} />
        <Route path="/cap-nhat-nhan-vien/:id" element={<UpdateManager />} />
        <Route path="/cap-nhat-tour/:id" element={<UpdateTour />} />
        <Route path="/quan-li-tour" element={<TourListTable />} />
        <Route path="/quan-li-ve" element={<ManageTickets />} />
        <Route path="/quan-li-ve-tour/:id" element={<ManageTicketsTour />} />
        <Route path="/thong-ke" element={<StatisticPerMonth />} />
      </Routes>
      {state.openForm && <BookingForm />}
      {state.showNotify && <OrderSuccessfully />}
      {state.loading && <SpinnerLoading />}
      <Footer />
    </div>

  );
}

export default App;
