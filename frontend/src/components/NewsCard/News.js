import { Box, Container, Grid, Paper, styled } from '@material-ui/core';
import React from 'react';
import NewsCard from './NewsCard';

const news = [{
    title: 'Tất tần tật những kinh nghiệm bạn cần biết trước khi du lịch Bình Ba',
    description: 'Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km',
    image: 'http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//01//dat-phong-khach-san-grand-ho-tram-gia-re_du-lich-viet_0.png',
},
{
    title: 'Tất tần tật những kinh nghiệm bạn cần biết trước khi du lịch Bình Ba',
    description: 'Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km',
    image: 'http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//01//dat-phong-khach-san-grand-ho-tram-gia-re_du-lich-viet_0.png',
},
{
    title: 'Tất tần tật những kinh nghiệm bạn cần biết trước khi du lịch Bình Ba',
    description: 'Bình Ba là một đảo nhỏ, diện tích trên 3km2, thuộc xã Cam Bình, thành phố Cam Ranh, tỉnh Khánh Hòa. Cách Nha Trang 60 km',
    image: 'http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//01//dat-phong-khach-san-grand-ho-tram-gia-re_du-lich-viet_0.png',
}]

function News(props) {
    return (
        <div className='news-wrapper' style={{marginTop:'90px'}}>
            <Container maxWidth="xl">
                <h2>TIN TỨC & TRẢI NGHIỆM DU LỊCH</h2>
                <h4>CHO BẠN NHỮNG KIẾN THỨC TUYỆT VỜI</h4>
                <Box sx={{ flexGrow: 1, padding:'0 20px', marginTop:'50px' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {
                            news.map((item, index) => (
                                <Grid item xs={12} md={4} sm={6} spacing={2} >
                                    <NewsCard
                                        title={item.news}
                                        description={item.description}
                                        image={item.image}
                                        key={index} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default News;