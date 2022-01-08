import React, { useEffect, useState } from 'react';
import APIClient from '../APIs/APIClient';
import { Box, Button, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Tabs from '../components/Tabs/Tabs';
import TourCard from '../components/TourCard/TourCard';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStore, actions } from '../store';

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
const ConvertToImageURL = (url) => {
    if (url) return `http://localhost:3001/${url.slice(6)}`
    else return "";
}
function TourDetail(props) {
    const classes = useStyles();
    const { id } = useParams();
    const [data, setData] = useState();
    const [state, dispatch] = useStore();
    useEffect(async () => {
        // const result = await APIClient.getTourDetail(id)
        const result = await axios(`http://localhost:3001/tour/${id}`);
        setData(result.data);
    }, []);
    
    const handleOnClick = (_id)=>{
        dispatch(actions.setBookTour(_id));
    }

    const settings = {
        className: classes.sliderContainer,
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
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 710,
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
            {data &&
                <Container maxWidth="lg">
                    <Box sx={{ marginTop: '130px', paddingLeft: { md: '60px' }, paddingRight: { md: '60px' } }}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <img className={classes.avatar} src={ConvertToImageURL(data[0].tour.imageUrl)} />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography gutterBottom variant="h4" component="div" align='left' style={{ marginTop: '20px' }}>
                                    {data[0].tour.name}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left' color="secondary">
                                    {`đ ${data[0].tour.price}`}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    {`"${data[0].tour.description}"`}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue' }}>Khách sạn: </span>{data[0].tour.hotelName}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue' }}>Số lượng: </span>{data[0].tour.amount}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue' }}>Số lượng còn: </span>{data[1].remainingAmount}
                                </Typography>
                                <Typography gutterBottom variant="button" component="div" align='left'>
                                    <Button variant="contained" color="secondary" onClick={()=>handleOnClick(data[0].tour._id)}>Đặt Tour</Button>
                                </Typography>
                                <Divider style={{ margin: '10px 0' }} />
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue' }}>Danh mục: </span> {data[0].tour.typePlace}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left' style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: 'darkblue' }}>Share on: </span> <FacebookIcon fontSize="large" color="primary" /> <InstagramIcon fontSize="large" color="primary" /> <LinkedInIcon fontSize="large" color='primary' />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{ margin: '10px 0' }} />
                        <Grid>
                            <Tabs detail={data[0].tour.schedule} />
                        </Grid>
                        <Divider style={{ margin: '10px 0' }} />
                        <Box sx={{ padding: '20px' }}>
                            {/* <h3 style={{ margin: '0', textAlign: 'left' }}>TOUR TƯƠNG TỰ</h3>                     
                        <Slider {...settings} style={{ padding: '20px'}}>
                            {
                                data.map((info, index) => (
                                    <TourCard
                                        name={info.name}
                                        description={info.description}
                                        image={`http://localhost:3001/${info.imageUrl.slice(6)}`}
                                        price={`₫${info.price}`}
                                        key={index} />
                                ))
                            }
                        </Slider> */}
                        </Box>
                    </Box>
                </Container>
            }
        </div>
    );
}

export default TourDetail;