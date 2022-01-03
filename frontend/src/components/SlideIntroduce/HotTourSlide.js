import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@material-ui/core";
import './index.css';
import TourCard from "../TourCard/TourCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from "axios";
import RegardPrice from "../RegardPrice/RegardPrice";

const PreArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                ...style, zIndex: 10, overflow: 'hidden', left: '-5px', width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '20%',
            }}
        >
            <ArrowBackIosNewIcon
                color='action'
                sx={{
                    position: 'absolute',
                    zIndex: 10,
                    left: 0,
                    transition: '0.4s',
                    ":hover": {
                        color: 'black',
                        left: '-2px'
                    }
                }}
            />
        </div>
    );
}
const NextArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                ...style, zIndex: 10, overflow: 'hidden', right: '-5px', width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '20%',
            }}
        >
            <ArrowForwardIosIcon
                color='action'
                sx={{
                    position: 'absolute',
                    zIndex: 10,
                    right: 0,
                    transition: '0.4s',
                    ":hover": {
                        color: 'black',
                        right: '-2px'
                    }
                }}
            />
        </div>
    );
}
function HotTourSlide(props) {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await axios('http://localhost:3001/mien-trung?page=1');
        console.log(result.data)
        setData(result.data.tours);
      },[]);
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        pauseOnHover: true,
        prevArrow: <PreArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
        ]
    };
    return (
        <div className="hot-tour-slide-wrapper">
            <Container maxWidth="lg">
                <div className="container-slide-hot-tour">
                    <h2> TOUR ĐƯỢC ƯA THÍCH NHẤT</h2>
                    <h4>ĐƠN GIẢN HÓA LỊCH TRÌNH KHÁM PHÁ</h4>
                    <Slider {...settings} style={{ padding: '30px'}}>
                        {
                            data.map((info, index) => (
                                <TourCard
                                    name={info.name}
                                    description={info.description}
                                    image={`http://localhost:3001/${info.imageUrl.slice(6)}`}
                                    price={`₫${RegardPrice(info.price)}`}
                                    key={index} />
                            ))
                        }
                    </Slider>
                </div>
            </Container>
        </div>
    );
}
export default HotTourSlide;