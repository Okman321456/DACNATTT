import { Divider, Grid } from '@material-ui/core';
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard/NewsCard';
import RegardPrice from '../components/RegardPrice/RegardPrice';

const news = [{
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
},
{
    title: 'Tất tần tật những kinh nghiệm bạn cần biết trước khi du lịch Bình Ba',
    description: 'Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km thành phố Cam Ranh, tỉnh Khánh Hòa',
    image: 'http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//01//dat-phong-khach-san-grand-ho-tram-gia-re_du-lich-viet_0.png',
},
]

function NewsList(props) {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await axios('http://localhost:3001/mien-trung?page=1');
        setData(result.data.tours);
    }, []);
    return (
        <div className='news-list-wrapper' style={{ marginTop: '110px' }}>
            <Container maxWidth='xl'>
                <h2>
                    TIN TỨC & TRẢI NGHIỆM DU LỊCH
                </h2>
                <Grid container spacing={3} style={{ justifyContent: 'center' }}>
                    <Grid container item md={9} xs={12} spacing={3}>
                        {
                            news.map((item, index) => (
                                <Grid item key={index} md={4} xs={6}>
                                    <NewsCard
                                        title={item.title}
                                        description={item.description}
                                        image={item.image}
                                        key={index}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <h4>CÁC TOUR NỔI BẬC</h4>
                        {
                            data.map((item, index) => (
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
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default NewsList;