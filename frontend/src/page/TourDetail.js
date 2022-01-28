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
import PriceDiscount from '../components/RegardPrice/PriceDiscount'
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import { Alert } from '@mui/material';

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75"
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47"
    }
});
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
    const [state, dispatch] = useStore()

    const classes = useStyles();
    const { id } = useParams();
    const [data, setData] = useState();
    const [load, onLoad] = useState();

    useEffect(async () => {
        document.title = "Bootcamp Travel | Chi tiết";
        dispatch(actions.setLoading(true));
        // const result = await APIClient.getTourDetail(id) 
        const result = await axios(`http://localhost:3001/tour/${id}`);
        setData(result.data);
        dispatch(actions.setLoading(false));
        console.log(result.data.similarTour)
    }, [load]);

    const handleOnClick = (_id, name, price, discount) => {
        dispatch(actions.setBookTour({
            id: _id,
            name,
            price,
            discount
        }));
    }
    const onHandleSendFeedback = async (data) => {
        const dataSubmit = {
            ...data,
            idTour: id,
        }
        onLoad(!load);
        const res = await APIClient.sendFeedback(id, dataSubmit);
        console.log(res)
        Alert("success", "Success! Cảm ơn đánh giá của bạn!");
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
                            <Grid item md={6} xs={12} style={{ position: "relative" }}>
                                <img className={classes.avatar} src={ConvertToImageURL(data.tour.imageUrl)} />
                                {data.tour.discount != '0' && <div style={{ position: 'absolute', zIndex: 100, top: '8px', left: '20px', height: '40px', lineHeight: '40px', width: '60px', backgroundColor: 'red', color: 'white' }}>
                                    -{new Number(data.tour.discount) * 100}%
                                </div>}
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Typography gutterBottom variant="h4" component="div" align='left' style={{ fontFamily: 'Dosis' }}>
                                    {data.tour.name}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left' color="secondary">
                                    <PriceDiscount valueDiscount={data.tour.discount} valuePrice={data.tour.price} />
                                </Typography>
                                <Typography gutterBottom component="div" variant="body1" align="left" style={{ display: 'flex', fontFamily: 'system-ui', color: 'gray' }}>
                                    <StyledRating
                                        name="customized-color"
                                        value={data.tour.rating}
                                        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                        precision={0.1}
                                        icon={<FavoriteIcon fontSize="inherit" style={{ color: 'red' }} />}
                                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" style={{ color: 'red' }} />}
                                        readOnly
                                        size="medium"
                                    />
                                    &nbsp;{`${parseFloat(data.tour.rating).toFixed(1)} | ${data.listFeedback.length} đánh giá`}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left' style={{ fontFamily: 'Roboto Mono' }}>
                                    {`"${data.tour.description}"`}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Thời gian: </span>
                                    {new Date(data.tour.timeStart.slice(0, 10)).toLocaleDateString("en-GB")} &#10137; {new Date(data.tour.timeEnd.slice(0, 10)).toLocaleDateString("en-GB")}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Khách sạn: </span>{data.tour.hotelName}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Số lượng: </span>{data.tour.amount}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Số lượng còn: </span>{data.remainingAmount}
                                </Typography>
                                <Typography gutterBottom variant="button" component="div" align='left'>
                                    <Button variant="contained" color="secondary" onClick={() => handleOnClick(data.tour._id, data.tour.name, data.tour.price, data.tour.discount)}>Đặt Tour</Button>
                                </Typography>
                                <Divider style={{ margin: '10px 0' }} />
                                <Typography gutterBottom variant="body1" component="div" align='left'>
                                    <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Danh mục: </span> {data.tour.typePlace}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left' style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Share on: </span> <FacebookIcon fontSize="large" color="primary" /> <InstagramIcon fontSize="large" color="primary" /> <LinkedInIcon fontSize="large" color='primary' />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{ margin: '10px 0' }} />
                        <Grid>
                            <Tabs detail={data.tour.schedule} feedback={data.listFeedback} onHandleSendFeedback={onHandleSendFeedback} />
                        </Grid>
                        <Divider style={{ margin: '10px 0' }} />
                        <Box sx={{ padding: '20px' }}>
                            {
                                data.similarTour.length >0 &&
                                <div>
                                    <h2 style={{ margin: '20px 0', textAlign: 'center', fontFamily: 'monospace', color: 'darkblue' }}>CÓ THỂ BẠN ĐANG TÌM KIẾM</h2>

                                    <Slider {...settings} style={{ padding: '20px' }}>
                                        {
                                            data.similarTour.map((info, index) => (
                                                <TourCard
                                                    rating={info.rating}
                                                    load={load}
                                                    onLoad={onLoad}
                                                    link={`/tour/${info._id}`}
                                                    _id={info._id}
                                                    name={info.name}
                                                    description={info.description}
                                                    image={`http://localhost:3001/${info.imageUrl.slice(6)}`}
                                                    price={info.price}
                                                    key={index}
                                                    discount={info.discount}
                                                />
                                            ))
                                        }
                                    </Slider>
                                </div>
                            }
                        </Box>
                    </Box>
                </Container>
            }
        </div >
    );
}

export default TourDetail;