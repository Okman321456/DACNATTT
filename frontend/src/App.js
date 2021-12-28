import './App.css';
import Home from './page/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TourList from './page/TourList';
import NewsList from './page/NewsList';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/tourlist" element={<TourList region="BẮC"/>} />
        <Route path="/news" element={<NewsList/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
