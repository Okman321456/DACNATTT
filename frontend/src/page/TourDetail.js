import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Tabs from '../components/Tabs/Tabs';
import TourCard from '../components/TourCard/TourCard';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';

const useStyles = makeStyles({
    avatar: {
        positionSize: 'cover',
        width: '100%',
    },
    sliderContainer: {
        "& .slick-list": {
          paddingBottom: "10px",
        },
    },
});
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

const tour = {
    _id: {
        $oid: "61c4938f58c8a7f609722f00"
    },
    name: "Du Lịch Côn Đảo",
    description: "Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển.",
    imageUrl: "public\\uploads\\1640272782877--ve-dep-bien-con-dao-01.jpg",
    route: 'Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển.',
    price: 5200000,
    amount: 50,
    region: 3,
    __v: 0,
    hotelName: "Men Hotel",
    listFeedback: [],
    typePlace: "Đảo"
}

function TourDetail(props) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await axios('http://localhost:3001/mien-trung?page=1');
        setData(result.data);
    }, []);
    const settings = {
        className:classes.sliderContainer,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        slidesToShow: 4,
        slidesToScroll: 4,
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
        <div className='tour-detail-wrapper'>
            <Container maxWidth="lg">
                <Box sx={{ marginTop: '130px', paddingLeft: { md: '60px' }, paddingLeft: { md: '60px' } }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12} spacing={2}>
                            <img className={classes.avatar} src={`http://localhost:3001/${tour.imageUrl.slice(6)}`} />
                        </Grid>
                        <Grid item md={6} xs={12} spacing={1}>
                            <Typography gutterBottom variant="h4" component="div" align='left' style={{ marginTop: '20px' }}>
                                {tour.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" align='left'>
                                {`${tour.price} VND`}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div" align='left'>
                                {`"${tour.description}"`}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div" align='left'>
                                <span style={{ color: 'darkblue' }}>Khách sạn: </span>{tour.hotelName}
                            </Typography>
                            <Typography gutterBottom variant="button" component="div" align='left'>
                                <Button variant="contained" color="secondary">THÊM VÀO GIỎ</Button>
                            </Typography>
                            <Divider style={{ margin: '10px 0' }} />
                            <Typography gutterBottom variant="body1" component="div" align='left'>
                                <span style={{ color: 'darkblue' }}>Danh mục: </span> {tour.typePlace}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div" align='left' style={{ display: 'flex', alignItems:'center' }}>
                                <span style={{ color: 'darkblue' }}>Share on: </span> <FacebookIcon fontSize="large" color="primary" /> <InstagramIcon fontSize="large"  color="primary" /> <LinkedInIcon fontSize="large" color='primary' />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />
                    <Grid>
                        <Tabs detail={tour.route} />
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />
                    <Box sx={{ padding: '20px' }}>
                        <h3 style={{ margin: '0', textAlign: 'left' }}>TOUR TƯƠNG TỰ</h3>                     
                        <Slider {...settings} style={{ padding: '20px'}}>
                            {
                                data.map((info, index) => (
                                    <TourCard
                                        name={info.name}
                                        description={info.description}
                                        image={`http://localhost:3001/${info.imageUrl.slice(6)}`}
                                        price={`${info.price} VND`}
                                        key={index} />
                                ))
                            }
                        </Slider>
                    </Box>
                </Box>
            </Container>

        </div>
    );
}

export default TourDetail;