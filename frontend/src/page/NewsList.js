import { Divider, Grid } from '@material-ui/core';
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import APIClient from '../APIs/APIClient';
import NewsCard from '../components/NewsCard/NewsCard';
import RegardPrice from '../components/RegardPrice/RegardPrice';
import { useStore, actions } from '../store';

function NewsList(props) {
    const [state, dispatch] = useStore()
    const [data, setData] = useState();
    useEffect(async () => {
        dispatch(actions.setLoading(true));
        const result = await APIClient.getNewsList();
        setData(result);
        dispatch(actions.setLoading(false));
    }, []);

    return (
        <div className='news-list-wrapper' style={{ marginTop: '110px' }}>
            {
                data &&
                <Container maxWidth='xl'>
                    <h2>
                        TIN TỨC & TRẢI NGHIỆM DU LỊCH
                    </h2>
                    <Grid container spacing={3} style={{ justifyContent: 'center' }}>
                        <Grid container item md={9} xs={12} spacing={3}>
                            {
                                data.news.map((item, index) => (
                                    <Grid item key={index} md={4} xs={6}>
                                        <NewsCard
                                            path={`/tin-tuc/${item._id}`}
                                            title={item.title}
                                            description={item.description}
                                            image={`http://localhost:3001/${item.imageUrl.slice(6)}`}
                                            key={index}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Grid item md={3} xs={12}>
                            {/* <h4>CÁC TOUR NỔI BẬC</h4>
                            {
                                news.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Divider style={{ margin: '5px 0' }} />
                                        <Grid container item xs={12} key={index} style={{ padding: '10px' }}>
                                            <Grid item xs={2} md={3}>
                                                <div style={{ aspectRatio: '1', overflow: 'hidden', maxHeight: '100px' }}>
                                                    <img style={{ maxHeight: '100px', height: '100%' }} src={`http://localhost:3001/${item.imageUrl.slice(6)}`} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={10} md={9}>
                                                <Typography variant="body1" align='left' sx={{ marginLeft: '10px' }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body1" align='left' sx={{ marginLeft: '10px', fontSize: '14px', color: 'coral' }}>
                                                    {`₫${RegardPrice(item.price)}`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                ))
                            } */}
                        </Grid>
                    </Grid>
                </Container>
            }
        </div>
    );
}

export default NewsList;