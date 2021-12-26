import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@material-ui/core";
import './index.css';
import TourCard from "../TourCard/TourCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const infos = [{
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}]

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
                    <Slider {...settings} style={{padding:'0 30px'}}>
                        {
                            infos.map((info, index) => (
                                <TourCard
                                    name={info.name}
                                    description={info.description}
                                    image={info.image}
                                    price={info.price}
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