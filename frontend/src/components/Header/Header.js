import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SearchOutlined } from '@material-ui/icons';
import { TextField } from '@material-ui/core';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { MenuList, Paper } from '@mui/material';
import logo from '../image/logoTravel.png';

const pages = ['TRANG CHỦ', 'MIỀN BẮC', 'MIỀN TRUNG', 'MIỀN NAM', 'TIN TỨC', 'GIỚI THIỆU'];
const pagesMenu = ['TRANG CHỦ', 'MIỀN BẮC', 'MIỀN TRUNG', 'MIỀN NAM', 'TIN TỨC', 'GIỚI THIỆU', 'ĐĂNG NHẬP', 'VALI CÁ NHÂN'];

const useStyles = makeStyles({
    root: {
        overflow:'visible',
        transition:'0.4s'
    },
    item: {
        "&:hover": {
            color: 'orange !important',
        },
    },
    hiddenBox: {
        height: '0 !important',
        padding:'0 !important',
    },
    hiddenSideBar: {
        width: '0 !important',
    },
});
const paperStyle = {
    width: 250,
    maxWidth: '100%',
    position: 'absolute',
    top: '0',
    left: '-24px',
    backgroundColor: '#000000ba',
    transition: '0.4s',
    overflow: 'hidden',
    height: '100vh',
    borderRadius: '0',
    zIndex: 1000,
};

const Header = () => {
    const classes = useStyles();
    const [openSideBar, setOpenSideBar] = React.useState(false);
    const [searchBox, setSearchBox] = React.useState(false);
    const [nav, setNav] = React.useState({
        height:'90px',
        color:'transparent'
    });

    React.useEffect(()=>{
        const setNavigation = ()=>{
            if(window.pageYOffset>200){
                setNav({
                    height:'70px',
                    color:'white'
                });
            }
            if(window.pageYOffset<=300){
                setNav({
                    height:'90px',
                    color:'transparent'
                });
            }
        }
        window.addEventListener("scroll",setNavigation)
        return () => {
            window.removeEventListener("scroll", setNavigation);
        }
    },[]);

    const handleOpenSearchField = () => {
        setSearchBox((searchBox) => !searchBox);
    };
    const handleClickCloseSearch = () => {
        setSearchBox(false);
    };
    const handleOpenSideBar = () => {
        setOpenSideBar(!openSideBar)
    };

    return (
        <AppBar position="fixed" className={classes.root} style={{ height: `${nav.height}`, backgroundColor:`${nav.color}`}}>
            <Container maxWidth="xl">
                <Toolbar sx={{height: `${nav.height}`}}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                        <img src={logo} height={nav.height}/>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', minHeight: '60px' }}>
                        {pages.map((page, index) => (
                            <Button
                                className={classes.item}
                                key={index}
                                sx={{ color: 'darkslateblue', display: 'block', px: 1, mx: 1, fontFamily:"'Roboto Mono', monospace", fontWeight:800 }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenSideBar}
                            color="inherit"
                        >
                            <MenuIcon style={{color:'black'}}/>
                        </IconButton>
                        <Paper
                            sx={paperStyle}
                            className={!openSideBar ? classes.hiddenSideBar : ''}
                        >
                            <MenuList>
                                {pagesMenu.map((page, index) => (
                                    <MenuItem key={index} onClick={handleOpenSideBar}>
                                        <Typography textAlign="center" color="gray">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Paper>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent:'center'}}>
                        <img src={logo} height={nav.height}/>
                    </Box>
                    <ClickAwayListener onClickAway={handleClickCloseSearch}>
                        <Box sx={{ flexGrow: 1, display:'flex', justifyContent: 'end', position: 'relative', width: '50px' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                onClick={handleOpenSearchField}
                                color="inherit"
                            >
                                <SearchOutlined style={{color:'black'}}/>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                color="inherit"
                                sx={{display:{xs:'none', md:'inline-block'}}}
                            >
                                <WorkOutlineOutlinedIcon style={{color:'black'}}/>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                color="inherit"
                                sx={{display:{xs:'none', md:'inline-block'}}}
                            >
                                <ManageAccountsOutlinedIcon style={{color:'black'}}/>
                            </IconButton>
                            <TextField
                                variant="standard"
                                placeholder='Tìm kiếm...'
                                className={!searchBox ? classes.hiddenBox : ''}
                                style={{
                                    padding: '5px',
                                    height: '35px',
                                    width: '200px',
                                    transition: '0.4s',
                                    position: 'absolute',
                                    top: '65px',
                                    backgroundColor: 'white',
                                    borderRadius:'3px',
                                    overflow:'hidden',
                                }}
                            />
                        </Box>
                    </ClickAwayListener>
                </Toolbar>
            </Container>
            <Box
                component="div"
                sx={{
                    width: '100%',
                    height: '100vh',
                    position: 'absolute',
                    backgroundColor: '#00000078',
                    trasition: '0.1s',
                    zIndex: 10,
                    display: { xs: 'block', md: 'none' }
                }}
                className={!openSideBar ? classes.hiddenSideBar : ''}
                onClick={handleOpenSideBar}
            >
            </Box>
        </AppBar>
    );
};
export default Header;
