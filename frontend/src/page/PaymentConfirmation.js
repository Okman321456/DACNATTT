import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import RegardPrice from '../components/RegardPrice/RegardPrice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const tours = [{
    _id: {
        $oid: "61c4938f58c8a7f609722f00"
    },
    name: "Du Lịch Côn Đảo",
    description: "Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển.",
    imageUrl: "public\\uploads\\1640272782877--ve-dep-bien-con-dao-01.jpg",
    route: 'Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển.',
    price: 5200000,
    amount: 50,
    region: 3,
    __v: 0,
    hotelName: "Men Hotel",
    listFeedback: [],
    typePlace: "Đảo",
}, {
    _id: {
        $oid: "61c4938f58c8a7f609722f00"
    },
    name: "Du Lịch Côn Đảo",
    description: "Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển.",
    imageUrl: "public\\uploads\\1640272782877--ve-dep-bien-con-dao-01.jpg",
    route: 'Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển. Côn Đảo được du khách trong và ngoài nước biết đến là 1 trong 10 hòn đảo quyến rũ nhất hành tinh, với núi non hùng vĩ, thiên nhiên hoang sơ tràn ngập hương vị của biển.',
    price: 5200000,
    amount: 50,
    region: 3,
    __v: 0,
    hotelName: "Men Hotel",
    listFeedback: [],
    typePlace: "Đảo"
}]

function PaymentConfirmation(props) {
    const max = [5, 5];//Gia su so luong con lai
    const [count, setCount] = useState([0, 0]);
    const handleIncrement = (index) => {
        if (count[index] < max[index])
            setCount([...count.slice(0, index), count[index] + 1, ...count.slice(index + 1)]);
    }
    const handleDecrement = (index) => {
        if (count[index] > 0)
            setCount([...count.slice(0, index), count[index] - 1, ...count.slice(index + 1)]);
    }

    return (
        <div className='payment-confirmation-wrapper' style={{ marginTop: '120px' }}>
            <Container maxWidth='lg'>
                <Grid container spacing={2}>
                    <Grid container item xs={12} md={8} justifyContent='space-between'>
                        {tours.map((tour, index) => (
                            <React.Fragment key={index}>
                                <Divider style={{ margin: '5px 0', width:'100%' }}/>
                                <Grid container key={index} justifyContent='space-between'>
                                    <Grid item style={{ display: 'flex' }} xs={12} sm={4}>
                                        <Box sx={{ aspectRatio: 1,maxWidth: "70px", display:'flex'}}>
                                            <img src={`http://localhost:3001/${tour.imageUrl.slice(6)}`} alt=""
                                                style={{width:'100%', margin:'auto' }}
                                            ></img>
                                        </Box>
                                        <Box sx={{ marginLeft: '10px',display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                            <Typography variant="body1" component="div">
                                                {tour.name}
                                            </Typography>
                                            <Typography variant="body1" component="div" color="secondary">
                                                {`₫${RegardPrice(tour.price)}`}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item style={{ margin: 'auto' }}>
                                        <ButtonGroup size="small">
                                            <Button disabled={count[index] <= 0} onClick={() => handleDecrement(index)}>-</Button>
                                            <Button disabled>{count[index]}</Button>
                                            <Button disabled={count[index] >= max[index]} onClick={() => handleIncrement(index)}>+</Button>
                                        </ButtonGroup>
                                    </Grid>
                                    <Grid item style={{ margin: 'auto', marginRight:0, display: 'flex' }}>
                                        <Typography variant='body1' component="div" style={{ marginRight: "5px" }}>{`₫${RegardPrice(tour.price * count[index])}`}</Typography>
                                        <DeleteOutlineIcon />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default PaymentConfirmation;