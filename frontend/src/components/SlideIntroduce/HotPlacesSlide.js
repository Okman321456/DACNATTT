import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@material-ui/core";
import './index.css';

const data = [{
    img: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//bana3.jpg',
    title:'Bà Nà Hill',
},
{
    img: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoian.jpg',
    title:'Hội An',
},
{
    img:'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//coco.jpg',
    title:'KoKoBay',
},
{
    img:'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//coco2.jpg',
    title:'Coco beach',
},
{
    img:'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//0-3.jpg',
    title:'Biển Mỹ Khê',
},
{
    img:'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//1057_deo_hai_van.jpg',
    title:'Đèo Hải Vân',
}];

function HotPlacesSlide() {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const heightImg = document.querySelector('.card-hot-place').clientWidth * 5 / 6;
        const updateSize = () => {
            const heightImg = document.querySelector('.card-hot-place').clientWidth * 5 / 6;
            setHeight(heightImg);
        }
        setHeight(heightImg);
        window.addEventListener("resize", updateSize);
        return () => {
            window.removeEventListener("resize", updateSize);
        }
    }, []);

    const Cards = ({ src, text, index }) => (
        <div style={{
            width: '100%',
            height: `${height}px`,
            position: 'relative',
            overflow: 'hidden',
            borderRadius:'10px'
        }}
            className={`card-hot-place card-item-${index}`}
        >
            <img className="image-slide-place"
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    boxSizing: 'border-box',
                    position: 'absolute',
                    zIndex: 1,
                    animation:'0.5s'
                }}
            />
            <div className="black-screen" />
            <div className="text-place-name">{text}</div>
        </div>
    )

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        pauseOnHover: true,
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
        ]
    };
    return (
        <Container maxWidth="lg" style={{marginTop:'90px'}}>
            <div className="container-slide-hot-place">
                <h2> ĐIỂM ĐẾN KHÔNG THỂ BỎ QUA</h2>
                <h4>CHIÊM NGƯỠNG TUYỆT TÁC THIÊN</h4>
                <Slider {...settings} style={{marginTop:'60px', padding:'0 30px'}}>
                    {
                        data.map((text, index) => (
                            <Cards key={index} text={text.title} src={text.img}/>
                        ))
                    }
                </Slider>
            </div>
        </Container>
    );
}

export default HotPlacesSlide;