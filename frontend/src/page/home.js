import React from 'react';
import SlideIntroduce from '../components/SlideIntroduce/SlideIntroduce';
import Filter from '../components/Filter/Filter';
import HotPlacesSlide from '../components/SlideIntroduce/HotPlacesSlide';
import HotTourSlide from '../components/SlideIntroduce/HotTourSlide';
import News from '../components/NewsCard/News';
import AdvantageCard from '../components/AdvantageCard/AdvantageCard';

function Home(props) {
    return (
        <div>
            <SlideIntroduce />
            <Filter text='BẠN ĐANG TÌM KIẾM?...'/>
            <HotPlacesSlide />
            <HotTourSlide />
            <News/>
            <AdvantageCard/>
        </div>
    );
}

export default Home;