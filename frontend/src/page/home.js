import React, { useEffect, useState } from 'react';
import SlideIntroduce from '../components/SlideIntroduce/SlideIntroduce';
import Filter from '../components/Filter/Filter';
import HotPlacesSlide from '../components/SlideIntroduce/HotPlacesSlide';
import HotTourSlide from '../components/SlideIntroduce/HotTourSlide';
import News from '../components/NewsCard/News';
import AdvantageCard from '../components/AdvantageCard/AdvantageCard';
import APIClient from '../APIs/APIClient';

function Home(props) {
    const [data, setData] = useState();
    useEffect(async () => {
        const result = await APIClient.getDataHomePage();
        setData(result);
    }, []);
    console.log(data)
    return (
        <div>
            {
                data &&
                <React.Fragment>
                    <SlideIntroduce />
                    <Filter text='BẠN ĐANG TÌM KIẾM?...' min={data.minmaxPrice.min} max={data.minmaxPrice.max} />
                    <HotPlacesSlide />
                    <HotTourSlide tourlist={data.outstandingTour} />
                    <News news={data.news} />
                    <AdvantageCard />
                </React.Fragment>

            }
        </div>
    );
}

export default Home;