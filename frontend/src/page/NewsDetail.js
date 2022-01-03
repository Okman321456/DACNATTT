import { Divider, Grid } from '@material-ui/core';
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// DỮ LIỆU GIẢ

const news = {
    title: 'Tất tần tật những kinh nghiệm bạn cần biết trước khi du lịch Bình Ba',
    description: '\tBình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km thành phố Cam Ranh, tỉnh Khánh Hòa. Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa.\n\tCách Nha Trang 60 km thành phố Cam Ranh, tỉnh Khánh Hòa. Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km thành phố Cam Ranh, tỉnh Khánh Hòa.',
    image: 'http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//01//dat-phong-khach-san-grand-ho-tram-gia-re_du-lich-viet_0.png',
};

const listNews = [{
    title: 'Tất tần tật những kinh nghiệm bạn cần biết trước khi du lịch Bình Ba',
    description: 'Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km thành phố Cam Ranh, tỉnh Khánh Hòa',
    image: 'http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//01//dat-phong-khach-san-grand-ho-tram-gia-re_du-lich-viet_0.png',
},
{
    title: 'Tất tần tật những kinh nghiệm bạn cần biết trước khi du lịch Bình Ba',
    description: 'Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km thành phố Cam Ranh, tỉnh Khánh Hòa',
    image: 'http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//01//dat-phong-khach-san-grand-ho-tram-gia-re_du-lich-viet_0.png',
},
{
    title: 'Tất tần tật những kinh nghiệm bạn cần biết trước khi du lịch Bình Ba',
    description: 'Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km thành phố Cam Ranh, tỉnh Khánh Hòa',
    image: 'http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//01//dat-phong-khach-san-grand-ho-tram-gia-re_du-lich-viet_0.png',
},]

function NewsDetail(props) {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await axios('http://localhost:3001/mien-trung?page=1');
        console.log(result.data)
        setData(result.data);
    }, []);
    return (
        <div className='news-detail-wrapper' style={{ marginTop: '150px' }}>
            <Container maxWidth='xl'>
                <Grid container spacing={5} style={{ justifyContent: 'center', padding:'0 30px' }}>
                    <Grid container item md={8} xs={12} spacing={3} style={{boxShadow:'0 1px 3px -2px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'}}>
                        <h2 style={{marginTop:'0px'}}>
                            {news.title}
                        </h2>
                        <Typography variant='body1' component='div' sx={{ margin: 'auto', marginTop: '20px' }}>
                            <img src={news.image} alt="" style={{ maxWidth: '100%', objectFit: 'cover' }} />
                        </Typography>
                        <Typography variant='body1' component='div' align='left' sx={{ margin: 'auto', marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                            {news.description}
                        </Typography>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" component="div" sx={{ marginTop: { xs: '20px', md: '20px' }}}>
                            ĐỌC NHIỀU
                        </Typography>
                        {
                            listNews.map((item, index) => (
                                <React.Fragment>
                                    <Divider style={{ margin: '5px 0' }} />
                                    <Grid container xs={12} key={index} style={{ padding: '10px' }}>
                                        <Grid xs={2} md={3}>
                                            <div style={{ aspectRatio: '1', overflow: 'hidden', maxHeight: '100px' }}>
                                                <img style={{ maxHeight: '100px', height: '100%' }} src={item.image} />
                                            </div>
                                        </Grid>
                                        <Grid xs={10} md={9}>
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
                                                    '-webkit-line-clamp': '2',
                                                    '-webkit-box-orient': 'vertical'
                                                }}>
                                                {item.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))
                        }
                        <Divider style={{ margin: '5px 0' }} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default NewsDetail;