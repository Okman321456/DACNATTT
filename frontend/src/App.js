import './App.css';
import React from 'react';
import Home from './page/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TourList from './page/TourList';
import NewsList from './page/NewsList';
import { Route, Routes,useLocation } from 'react-router-dom';
import TourDetail from './page/TourDetail';
import NewsDetail from './page/NewsDetail';

function useQuery() {
  const { search } = useLocation();

  // return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const { search } = useLocation();
  const searchParagram = new URLSearchParams(search);

  const getPage = ()=>{
    console.log(searchParagram.get('page'));
    return searchParagram.get('page')
  }
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/mien-bac" exact element={<TourList region="BẮC" url="mien-bac" />} />
        <Route path="/mien-trung" exact element={<TourList region="TRUNG" url="mien-trung"/>} />
        <Route path="/mien-nam" exact element={<TourList region="NAM" url="mien-nam" />}/>
        <Route path="/detail" exact element={<TourDetail/>}/>
        <Route path="/news" element={<NewsList/>} />
        <Route path="/news-detail" element={<NewsDetail/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
