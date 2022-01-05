import { Box, Container, Grid, Paper, styled } from '@material-ui/core';
import React from 'react';
import NewsCard from './NewsCard';

function News({news}) {
    return (
        <div className='news-wrapper' style={{marginTop:'90px'}}>
            <Container maxWidth="xl">
                <h2>TIN TỨC & TRẢI NGHIỆM DU LỊCH</h2>
                <h4>CHO BẠN NHỮNG KIẾN THỨC TUYỆT VỜI</h4>
                <Box sx={{ flexGrow: 1, padding:'0 20px', marginTop:'50px' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {
                            news.map((item, index) => (
                                <Grid item xs={12} md={4} sm={6} key={index}>
                                    <NewsCard
                                        path={`/tin-tuc/${item._id}`}
                                        title={item.title}
                                        description={item.description}
                                        image={`http://localhost:3001/${item.imageUrl.slice(6)}`}
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