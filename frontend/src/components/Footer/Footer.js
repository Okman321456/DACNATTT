import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import logo from '../image/logoTravel.png';
import './Footer.css';

function Footer(props) {
    return (
        <div className='footer-wrapper'
            style={{
                marginTop: '90px',
                backgroundImage: "url('http://mauweb.monamedia.net//trabble//wp-content//uploads//2018//12//subscribe-1.jpg)",
                backgroundSize: 'cover',
            }}>
            <Box sx={{ flexGrow: 1, padding: '50px 30px', backgroundColor: '#000000db' }}>
                <Grid container>
                    <Grid item xs={12} md={3} sm={6}>
                        <Typography variant="h6" color="white" align="left" component='div'>
                            THÔNG TIN
                        </Typography>
                        <Typography variant='body1' align='left' component='div'>
                            <ul style={{ listStyle: 'none', padding: 0 }} className='students'>
                                <li><a href="https://www.facebook.com/thang.phung.3363" target="_blank" >Văn Thắng</a></li>
                                <li><a href="https://www.facebook.com/tranlongnhat333" target="_blank">Long Nhật</a></li>
                                <li><a href="https://www.facebook.com/profile.php?id=100013871191019" target="_blank">Hữu Hoàng</a></li>
                                <li><a href="https://www.facebook.com/boluong31.01/" target="_blank">Việt Hưng</a></li>
                                <li><a href="https://www.facebook.com/nguyen.h.nguyen.50999" target="_blank">Phương Nguyên</a></li>
                            </ul>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
                        <Typography variant="h6" color="white" align="left" component='div'>
                            LIÊN HỆ
                        </Typography>
                        <Typography variant='body1' align='left' component='div'>
                            <ul style={{ listStyle: 'none', padding: 0 }} className='address'>
                                <li style={{display:'flex'}}><LocationOnIcon color='warning' />&nbsp;Đại học Bách Khoa Đà Nẵng</li>
                                <li style={{display:'flex'}}><LocalPhoneIcon color='warning' />&nbsp;0909 999 999</li>
                                <li style={{display:'flex'}}><MailOutlineIcon color='warning' />&nbsp;tet.anlanh@gmail.com</li>
                                <li style={{display:'flex'}}><FacebookIcon color='warning'/><InstagramIcon color='warning' sx={{marginLeft:'5px'}}/><TwitterIcon color='warning' sx={{marginLeft:'5px'}}/></li>
                            </ul>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
                        <Typography variant="h6" color="white" align="left" component='div'>
                            PHỔ BIẾN
                        </Typography>
                        <Typography variant='body1' align='left' component='div'>
                            <ul style={{ listStyle: 'none', padding: 0 }} className='address'>
                                <li><LocalOfferIcon color='warning' /> Đà Nẵng</li>
                                <li><LocalOfferIcon color='warning' /> Đà Lạt</li>
                                <li><LocalOfferIcon color='warning' /> Hội An</li>
                            </ul>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} sm={6}>
                        <Typography variant="h6" color="white" align="left" component='div'>
                            KẾT NỐI VỚI CHÚNG TÔI
                        </Typography>
                        <Typography variant="body1" align="left" component='div'>
                            <TextField id="submit-gmail-tf"
                                error placeholder='Your gmail...'
                                sx={{
                                    backgroundColor: 'white', borderRadius: '5px', height: '50px', marginRight: '10px'
                                }}
                                inputProps={{
                                    style: {
                                        padding: '10px',
                                        height: '30px',
                                    },
                                }} />
                            <Button sx={{ height: '50px', backgroundColor: 'khaki', border: '1px solid white' }}>SUBMIT</Button>
                        </Typography>
                        <Box sx={{backgroundColor:'white', marginTop: '30px'}}>
                            <img src={logo} height="120px" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Footer;