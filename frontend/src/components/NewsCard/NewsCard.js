import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@material-ui/core';

export default function NewsCard({title, description, image}) {
    return (
        <Card
            sx={{
                boxSizing: 'border-box',
                ':hover': {
                    transition: '0.4s',
                    boxShadow: '5px 3px 10px 1px #715c5cd1'
                },
                cursor: 'pointer',
                borderRadius: '10px',
                maxWidth: 345,
                margin: 'auto'
            }}
            
        >
            <CardMedia
                component="img"
                alt={title}
                height="200"
                image={image}
                sx={{
                    ':hover': {
                        transform: 'scale(1.1)',
                        transition: '1s'
                    },
                    transition: '1s',
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="left">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="info">Đọc thêm...</Button>
            </CardActions>
        </Card>
    );
}
