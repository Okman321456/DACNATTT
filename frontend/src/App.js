import './App.css';
import Home from './page/Home';
import Header from './components/Header/Header';
// import Filter from './components/Filter/Filter';
// import HotPlacesSlide from './components/SlideIntroduce/HotPlacesSlide';
// import HotTourSlide from './components/SlideIntroduce/HotTourSlide';
// import SlideIntroduce from './components/SlideIntroduce/SlideIntroduce';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <SlideIntroduce/>
      <Filter/>
      <HotPlacesSlide/>
      <HotTourSlide/> */}
      <Home/>
    </div>
  );
}

export default App;
