import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useStore, actions } from '../../store'
import PriceDiscount from '../RegardPrice/PriceDiscount';
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75"
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47"
    }
});

export default function TourCard({ _id, name, description, image, rating, price, discount, link, load, onLoad }) {
    const [shadow, setShadow] = React.useState(false);
    const onMouseOver = () => setShadow(true);
    const onMouseOut = () => setShadow(false);
    const [state, dispatch] = useStore();

    const handleOnClick = (_id) => {
        dispatch(actions.setBookTour(_id));
    }
    const handleLoad = () => {
        if (onLoad) onLoad(!load);
    }
    return (
        <Card
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            raised={shadow}
            sx={{
                boxSizing: 'border-box',
                ':hover': {
                    paddingTop: '1px',
                    transition: '0.4s',
                    boxShadow: '5px 5px 5px #715c5cd1'
                },
                cursor: 'pointer',
                borderRadius: '10px',
                maxWidth: 300,
                height: 450,
                marginLeft: 'auto',
                marginRight: 'auto',
                minWidth: 150,
                position: 'relative'
            }}
            title={name}
        >
            {new Number(discount) * 100 != 0 && <div style={{ position: 'absolute', zIndex: 100, top: 0, left: '20px', height: '40px', lineHeight: '40px', width: '60px', backgroundColor: 'red', color: 'white' }}>
                -{new Number(discount) * 100}%
            </div>}
            <CardMedia
                component="img"
                alt={name}
                height="250"
                image={image}
                sx={{
                    ':hover': {
                        transform: 'scale(1.1)',
                        transition: '1s'
                    },
                    transition: '1s',
                }}
            />
            <CardContent sx={{ padding: '0 16px' }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ marginTop: '10px', height: '30px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {name}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: 16, color: 'red' }} color="blueviolet" align="left">
                    <PriceDiscount valuePrice={price} valueDiscount={discount} />
                </Typography>
                <Typography gutterBottom component="div" variant="body1" color="blueviolet" align="left" style={{height:'15px'}}>
                    <StyledRating
                        name="customized-color"
                        defaultValue={rating}
                        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                        precision={0.1}
                        icon={<FavoriteIcon fontSize="inherit" style={{color:'red'}} />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" style={{color:'red'}}/>}
                        readOnly
                        size="small"
                    />
                </Typography>
                <Typography variant="body2" color="text.secondary" align="left"
                    sx={{
                        overflow: 'hidden',
                        lineHeight: '1.4',
                        fontSize: '14px',
                        height: '58px',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="info" variant="outlined" onClick={() => handleOnClick(_id)}>Đặt</Button>
                <Link to={link} style={{ textDecoration: 'none' }} onClick={handleLoad}><Button size="small" color="info" variant="outlined">Xem thêm</Button></Link>
            </CardActions>
        </Card>
    );
}
