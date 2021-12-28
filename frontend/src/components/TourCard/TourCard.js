import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TourCard({name, description, image, price}) {
    const [shadow, setShadow] = React.useState(false);
    const onMouseOver = () => setShadow(true);
    const onMouseOut = () => setShadow(false);
    return (
        <Card
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            zDepth={shadow}
            raised={shadow}
            sx={{
                boxSizing:'border-box',
                ':hover':{
                    marginLeft:'5px',
                    transition:'0.4s',
                    boxShadow: '5px 10px 10px 1px #715c5cd1'
                },
                cursor:'pointer',
                borderRadius:'10px',
                maxWidth:345,
                height:450,
                marginLeft: 'auto',
                marginRight:'auto',
                minWidth:200,
            }}
        >
            <CardMedia
                component="img"
                alt={name}
                height="250"
                image={image}
                sx={{
                    ':hover':{
                        transform: 'scale(1.1)',
                        transition:'1s'
                    },
                    transition:'1s',
                }}
            />
            <CardContent sx={{padding:'0 16px'}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 16 }} color="blueviolet" align="left">
                    {`Giá: ${price}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="left" height={80} style={{overflow:'hidden'}}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="info" variant="outlined">Đặt</Button>
                <Button size="small" color="info" variant="outlined">Xem thêm</Button>
            </CardActions>
        </Card>
    );
}
