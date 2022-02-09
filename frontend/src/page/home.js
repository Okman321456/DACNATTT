import React, { useEffect, useState } from 'react';
import SlideIntroduce from '../components/SlideIntroduce/SlideIntroduce';
import Filter from '../components/Filter/Filter';
import HotPlacesSlide from '../components/SlideIntroduce/HotPlacesSlide';
import HotTourSlide from '../components/SlideIntroduce/HotTourSlide';
import News from '../components/NewsCard/News';
import AdvantageCard from '../components/AdvantageCard/AdvantageCard';
import APIClient from '../APIs/APIClient';
import { useStore, actions } from '../store';

function Home(props) {
    const [state, dispatch] = useStore()
    const [data, setData] = useState();
    useEffect(async () => {
        document.title = "Bootcamp Travel | Trang chủ";
        dispatch(actions.setLoading(true));
        const result = await APIClient.getDataHomePage();
        setData(result);
        dispatch(actions.setLoading(false));
    }, []);
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