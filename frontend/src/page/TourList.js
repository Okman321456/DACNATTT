import { Container, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import TourCard from '../components/TourCard/TourCard';

const infos = [{
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}, {
    name: 'Hoi An',
    description: 'Thiên đường tình yêu” là mỹ từ xưng tụng Đà Nẵng quả không sai. Bờ biển buông lơi, uốn cong theo từng cơn sóng vỗ được điểm tô bởi những hàng cọ, hàng dừa',
    image: 'http://mauweb.monamedia.net//travelvn//wp-content//uploads//2019//01//hoa-dang.jpg',
    alt: 'Hoi An',
    price: '$1000',
}]

function TourList({ region }) {
    const [age, setAge] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div className='tour-list'>
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
                            value={age}
                            onChange={handleChange}
                            sx={{ height: { md: '41px', xs: '36px' }, color: '#660000' }}
                            inputProps={{ style: { border: '1px solid #660000 ' } }}
                        >
                            <MenuItem value={1}>Giá &#8593;</MenuItem>
                            <MenuItem value={2}>Giá &#8595;</MenuItem>
                            <MenuItem value={3}>Tên &#8593;</MenuItem>
                            <MenuItem value={4}>Tên &#8595;</MenuItem>
                        </Select>
                    </FormControl>
                </Typography>
            </Box>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1, marginTop: '10px' }}>
                    <Grid container spacing={2}>
                        {
                            infos.map((tour, index) => (
                                <Grid item key={index} lg={3} md={4} xs={6} spacing={1}>
                                    <TourCard
                                        name={tour.name}
                                        description={tour.description}
                                        image={tour.image}
                                        price={`${tour.price} VND`}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Container>
            <Stack spacing={2} sx={{marginTop:'40px'}}>
                <Pagination count={10} page={page} onChange={handleChangePage} sx={{display:'flex', justifyContent:'center'}} />
            </Stack>
        </div>
    );
}

export default TourList;