import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Divider, Grid } from '@material-ui/core';
import APIClient from '../APIs/APIClient';
import { Container, Stack, Typography } from '@mui/material';
import { useStore, actions } from '../store';

const ConvertToImageURL = (url) => {
    if (url) return `http://localhost:3001/${url.slice(6)}`
    else return "";
}

function NewsDetail(props) {
    const [state, dispatch] = useStore()
    const [dataNews, setDataNews] = useState();
    const [dataNewsList, setDataNewsList] = useState();
    const [load, onLoad] = useState(false);
    const { id } = useParams();
    useEffect(async () => {
        dispatch(actions.setLoading(true));
        const result = await axios(`http://localhost:3001/news/${id}`);
        const list = await APIClient.getNewsList();
        setDataNews(result.data);
        setDataNewsList(list);
        dispatch(actions.setLoading(false));
    },[]);
    useEffect(async () => {
        const result = await APIClient.getNewsDetail(id)
        setDataNews(result);
    }, [load]);
    return (
        <div className='news-detail-wrapper' style={{ marginTop: '150px' }}>
            {dataNews &&
                <Container maxWidth='xl'>
                    <Grid container spacing={5} style={{ justifyContent: 'center', padding: '0 30px' }}>
                        <Grid container item md={8} xs={12} spacing={3} style={{ boxShadow: '0 1px 3px -2px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)' }}>
                            <h2 style={{ marginTop: '0px' }}>
                                {dataNews.title}
                            </h2>
                            <Typography variant='body1' component='div' sx={{ margin: 'auto', marginTop: '20px' }}>
                                <img src={ConvertToImageURL(dataNews.imageUrl)} width="100%"/>
                            </Typography>
                            <Typography variant='body1' component='div' align='left' sx={{ margin: 'auto', marginTop: '20px', whiteSpace: 'pre-wrap', lineHeight:'2'}}>
                                {dataNews.description}
                            </Typography>

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" component="div" sx={{ marginTop: { xs: '20px', md: '20px' } }}>
                                ĐỌC NHIỀU
                            </Typography>
                            {
                                dataNewsList && dataNewsList.news.map((item, index) => (
                                    <Link to={`/tin-tuc/${item._id}`} key = {index} style={{textDecoration:'none'}} onClick={()=>{onLoad(!load)}}>
                                        <Divider style={{ margin: '5px 0' }} />
                                        <Grid container item xs={12} key={index} style={{ padding: '10px', cursor:'pointer' }}>
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
                                                        fontFamily:'Roboto Mono',
                                                        lineHeight: '1.3',
                                                        fontSize: '12px',
                                                        height: '33px',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        'WebkitLineClamp': '2',
                                                        'WebkitBoxOrient': 'vertical'
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
                </Container>
            }
        </div>
    );
}

export default NewsDetail;