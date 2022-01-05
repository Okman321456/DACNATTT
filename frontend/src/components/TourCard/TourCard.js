import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import {useStore, actions} from '../../store'

export default function TourCard({_id, name, description, image, price, link}) {
    const [shadow, setShadow] = React.useState(false);
    const onMouseOver = () => setShadow(true);
    const onMouseOut = () => setShadow(false);
    const [state, dispatch] = useStore();

    const handleOnClick = (_id)=>{
        dispatch(actions.setBookTour(_id));
    }
    return (
        <Card
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            raised={shadow}
            sx={{
                boxSizing:'border-box',
                ':hover':{
                    paddingTop:'1px',
                    transition:'0.4s',
                    boxShadow: '5px 5px 5px #715c5cd1'
                },
                cursor:'pointer',
                borderRadius:'10px',
                maxWidth:300,
                height:450,
                marginLeft:'auto',
                marginRight:'auto',
                minWidth:150,
            }}
            title={name}
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
                <Typography gutterBottom variant="h6" component="div" sx={{marginTop:'10px',height:'30px', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>
                    {name}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 16 }} color="blueviolet" align="left">
                    {`Giá: ${price}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="left"
                    sx={{
                        overflow:'hidden',
                        lineHeight:'1.4',
                        fontSize:'14px',
                        height:'78px',
                        textOverflow:'ellipsis',
                        display:'-webkit-box',
                        WebkitLineClamp:'4',
                        WebkitBoxOrient:'vertical'
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="info" variant="outlined" onClick={()=>handleOnClick(_id)}>Đặt</Button>
                <Link to={link} style={{textDecoration:'none'}}><Button size="small" color="info" variant="outlined">Xem thêm</Button></Link>
            </CardActions>
        </Card>
    );
}
