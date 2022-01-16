import React, { useEffect } from 'react';
import { Container, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TourCard from '../components/TourCard/TourCard';
import { Divider } from '@material-ui/core';
import RegardPrice from '../components/RegardPrice/RegardPrice';
import APIClient from '../APIs/APIClient';
import { useStore, actions } from '../store';

const ConvertToImageURL = (url) => {
    if (url) return `http://localhost:3001/${url.slice(6)}`
    else return "";
}

function TourList({ region, url }) {
    let navigate = useNavigate();
    const [state, dispatch] = useStore()
    const { search } = useLocation();
    let searchParagram = new URLSearchParams(search);
    let pageIni = searchParagram.get("page") ? searchParagram.get("page").toString() : 1;
    console.log("page: ", pageIni);
    let sortBy = searchParagram.get("sortBy") ? searchParagram.get("sortBy").toString() : "";
    let urltem = window.location.href;
    const [sort, setSort] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [load, onLoad] = React.useState(false);
    const [pageNumber, setPageNumber] = React.useState(parseInt(pageIni));
    const [data, setData] = React.useState();
    const [newsList, setNewsList] = React.useState();

    const paramURL = { page: pageIni, sortBy };
    console.log("param", paramURL)

    const handleChangePage = (event, value) => {
        setPageNumber(value);
        sortBy ? navigate(`/${url}?page=${value}&sortBy=${sortBy}`) :
            navigate(`/${url}?page=${value}`);
        onLoad(!load);
    };
    useEffect(async () => {
        dispatch(actions.setLoading(true));
        const result = await APIClient.getTourList(paramURL, url);
        const newsList = await APIClient.getNewsList();
        setData(result);
        setNewsList(newsList);
        dispatch(actions.setLoading(false));
    }, [load, urltem]);

    const handleChange = (event) => {
        navigate(`/${url}?page=${pageNumber}&sortBy=${event.target.value}`);
        setSort(event.target.value);
        onLoad(!load);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div className='tour-list'>
            {data &&
                <React.Fragment>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '150px',
                        padding: '50px 50px 10px 50px',
                        backgroundImage: "url('https://i1-dulich.vnecdn.net//2021//12//17//2-1639731390.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=u1CJGQlx3X7u5U4jEpZxDA')",
                        backgroundSize: 'cover',
                        backgroundPosition: '0 50%'
                    }}>
                        <Typography gutterBottom variant="body1" component="div"
                            sx={{
                                border: '1px solid #660000', color: '#660000',
                                borderRadius: '30px', padding: '5px', fontSize: { md: '1.2em', sm: '1em' }, marginTop: '30px', marginLeft: '20px'
                            }}>
                            {`DU LỊCH MIỀN ${region}`}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ marginTop: '30px', marginRight: '20px', }}>
                            <FormControl sx={{ m: 1, minWidth: 120, borderRadius: "30px", color: '#660000', height: { md: '41px', xs: '36px' } }} error>
                                <InputLabel id="demo-simple-select-helper-label" sx={{ color: '#660000', marginTop: { xs: '-8px', md: '-6px' } }}>Sắp xếp</InputLabel>
                                <Select
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={sort}
                                    onChange={handleChange}
                                    sx={{ height: { md: '41px', xs: '36px' }, color: '#660000' }}
                                    inputProps={{ style: { border: '1px solid #660000 ' } }}
                                >
                                    <MenuItem value='price-asc'>Giá &#8593;</MenuItem>
                                    <MenuItem value='price-dec'>Giá &#8595;</MenuItem>
                                    <MenuItem value='name-asc'>Tên &#8593;</MenuItem>
                                    <MenuItem value='name-dec'>Tên &#8595;</MenuItem>
                                </Select>
                            </FormControl>
                        </Typography>
                    </Box>
                    <Container maxWidth="lg">
                        <Box sx={{ flexGrow: 1, marginTop: '30px' }}>
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
                                            <Pagination count={Math.ceil(data.totalTourRegion / 6)} page={pageNumber} onChange={handleChangePage} sx={{ display: 'flex', justifyContent: 'center' }} />
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <h4>TRẢI NGHIỆM DU LỊCH</h4>
                                    {
                                        newsList && newsList.news.map((item, index) => (
                                            <Link to={`/tin-tuc/${item._id}`} style={{textDecoration:'none'}} key={index}>
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
                        </Box>
                    </Container>
                </React.Fragment>
            }
        </div>
    );
}

export default TourList;