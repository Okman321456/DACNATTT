import React from 'react';
import SlideIntroduce from '../components/SlideIntroduce/SlideIntroduce';
import Filter from '../components/Filter/Filter';
import HotPlacesSlide from '../components/SlideIntroduce/HotPlacesSlide';
import HotTourSlide from '../components/SlideIntroduce/HotTourSlide';
import News from '../components/NewsCard/News';

function Home(props) {
    return (
        <div>
            <SlideIntroduce />
            <Filter />
            <HotPlacesSlide />
            <HotTourSlide />
            <News/>
        </div>
    );
}

export default Home;