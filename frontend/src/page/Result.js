import { Divider } from '@material-ui/core';
import { Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import APIClient from '../APIs/APIClient';
import Filter from '../components/Filter/Filter';
import TourCard from '../components/TourCard/TourCard';
import { actions, useStore } from '../store';

const ConvertToImageURL = (url) => {
    if (url) return `http://localhost:3001/${url.slice(6)}`
    else return "";
}
function Result(props) {
    const [state, dispatch] = useStore()
    let navigate = useNavigate();
    const { search } = useLocation();
    let searchParagram = new URLSearchParams(search);
    let pageIni = searchParagram.get("page") ? searchParagram.get("page").toString() : 1;

    const [pageNumber, setPageNumber] = React.useState(parseInt(pageIni));
    const [data, setData] = React.useState();
    const [news, setNews] = React.useState();

    const paramURL = { page: pageNumber };
    const paramTem = { page: pageNumber }
    const [load, onLoad] = React.useState(false);
    searchParagram.forEach((value, key) => {
        if (value != 'null' && value != 'false')
            paramURL[key] = value;
        paramTem[key] = value;
    })
    useEffect(async () => {
        dispatch(actions.setLoading(true));
        setTimeout(()=>{
            dispatch(actions.setLoading(false));
        },5000);
        const result = await APIClient.getResultFilter(paramURL);
        console.log(result);
        if(result.response && result.response.status === 404)
        setData(false);
        else setData(result);
        
        dispatch(actions.setLoading(false));

    }, [pageNumber, load,state.search]);

    useEffect(async ()=>{
        document.title = "Bootcamp Travel | Kết quả";
        const newsList = await APIClient.getNewsList();
        setNews(newsList.news);
    },[]);

    const handleChangePage = (event, value) => {
        const arrayParams = Object.keys(paramURL);
        let stringParams = arrayParams.reduce((previousValue, currentValue)=>
            currentValue=='page' ? previousValue : `${previousValue}${currentValue}=${paramURL[currentValue]}&`,"")
            .slice(0,-1);
        navigate(`/cua-hang?${stringParams}&page=${value}`);
        setPageNumber(value);
    };
    return (
        <div className='tour-list' style={{ marginTop: '90px' }}>
            <Filter text='KẾT QUẢ TÌM KIẾM' load={load} onLoad={onLoad} min={data ? data.minmaxPrice.min : 0} max={data ? data.minmaxPrice.max : 30000000} />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1, marginTop: '30px' }}>
                    {(data) ?
                        <Grid container spacing={1}>
                            <Grid container item xs={12} md={9} spacing={2}>
                                {
                                    data.tours.map((tour, index) => (
                                        <Grid item key={index} md={4} xs={12} sm={6}>
                                            <TourCard
                                                _id={tour._id}
                                                link={`/tour/${tour._id}`}
                                                name={tour.name}
                                                description={tour.description}
                                                image={`http://localhost:3001/${tour.imageUrl.slice(6)}`}
                                                price={tour.price}
                                                discount={tour.discount}
                                                rating={tour.rating}
                                            />
                                        </Grid>
                                    ))
                                }
                                <Grid item xs={12}>
                                    <Stack spacing={2} sx={{ marginTop: '40px' }}>
                                        <Pagination count={Math.ceil(data.totalTourFilter / 6)} page={pageNumber} onChange={handleChangePage} sx={{ display: 'flex', justifyContent: 'center' }} />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <h4>TRẢI NGHIỆM DU LỊCH</h4>
                                {
                                    news && news.map((item, index) => (
                                        <Link to={`/tin-tuc/${item._id}`} key={index} style={{ textDecoration: 'none' }} >
                                            <Divider style={{ margin: '5px 0' }} />
                                            <Grid container item xs={12} key={index} style={{ padding: '10px' }}>
                                                <Grid item xs={2} md={3}>
                                                    <div style={{ aspectRatio: '1', overflow: 'hidden', maxHeight: '100px' }}>
                                                        <img style={{ maxHeight: '100px', height: '100%' }} src={ConvertToImageURL(item.imageUrl)} />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={10} md={9}>
                                                    <Typography variant="body1" align='left' sx={{ marginBottom: '5px', marginLeft: '10px', maxHeight: '20px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body1" align='left'
                                                        sx={{
                                                            marginLeft: '10px',
                                                            overflow: 'hidden',
                                                            lineHeight: '1.3',
                                                            fontSize: '12px',
                                                            height: '33px',
                                                            textOverflow: 'ellipsis',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: '2',
                                                            WebkitBoxOrient: 'vertical'
                                                        }}>
                                                        {item.description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Link>
                                    ))
                                }
                                <Divider style={{ margin: '5px 0' }} />
                            </Grid>
                        </Grid>
                        : <h1> KHÔNG TÌM THẤY TOUR PHÙ HỢP </h1>
                    }
                </Box>
            </Container>

        </div>
    );
}

export default Result;