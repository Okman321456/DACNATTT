import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchOutlined } from '@material-ui/icons';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuList, Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { actions, useStore } from '../../store';
import logo from '../image/logoBootcamp.png';

const pagesUser = [{
    title: 'TRANG CHỦ',
    path: '/'
}, {
    title: 'MIỀN BẮC',
    path: '/mien-bac'
}, {
    title: 'MIỀN TRUNG',
    path: '/mien-trung'
}, {
    title: 'MIỀN NAM',
    path: '/mien-nam'
},
{
    title: 'TIN TỨC',
    path: '/tin-tuc'
}];

const pagesAdmin = [
    {
        title: 'QUẢN LÍ NHÂN VIÊN',
        path: '/quan-li-nhan-vien'
    },
    {
        title: 'THÊM NHÂN VIÊN',
        path: '/them-nhan-vien'
    },
];
const pagesManager = [
    {
        title: 'QUẢN LÍ TOUR',
        path: '/quan-li-tour'
    },
    {
        title: 'THÊM TOUR',
        path: '/them-tour'
    },
    {
        title: 'QUẢN LÍ VÉ',
        path: '/quan-li-ve'
    },
];

let menuList = [{
    title: 'QUẢN LÍ TOUR',
    path: '/admin'
}];
const pagesMenu = ['TRANG CHỦ', 'MIỀN BẮC', 'MIỀN TRUNG', 'MIỀN NAM', 'TIN TỨC', 'GIỚI THIỆU', 'ĐĂNG NHẬP', 'VALI CÁ NHÂN'];

const useStyles = makeStyles({
    root: {
        overflow: 'visible',
        transition: '0.4s'
    },
    item: {
        "&:hover": {
            color: 'orange !important',
        },
    },
    hiddenBox: {
        height: '0 !important',
        padding: '0 !important',
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
    let navigate = useNavigate();
    const classes = useStyles();
    const [state, dispatch] = useStore();
    // let menuList;
    // React.useEffect(()=>{
    if (state.account.role == 'admin') menuList = pagesAdmin;
    if (state.account.role == 'user') menuList = pagesUser;
    if (state.account.role == 'manage') menuList = pagesManager;
    console.log(state.account.role)
    // },[state.role]);

    const [openSideBar, setOpenSideBar] = React.useState(false);
    const [searchBox, setSearchBox] = React.useState(false);
    const [nav, setNav] = React.useState({
        height: '90px',
        color: 'transparent'
    });
    React.useEffect(() => {
        const setNavigation = () => {
            if (window.pageYOffset > 100) {
                setNav({
                    height: '70px',
                    color: 'white'
                });
            }
            if (window.pageYOffset <= 100) {
                setNav({
                    height: '90px',
                    color: 'transparent'
                });
            }
        }
        window.addEventListener("scroll", setNavigation)
        return () => {
            window.removeEventListener("scroll", setNavigation);
        }
    }, []);

    const handleOpenSearchField = () => {
        setSearchBox((searchBox) => !searchBox);
        document.getElementById('search-field').focus()
    };
    const handleClickCloseSearch = () => {
        setSearchBox(false);
    };
    const handleOpenSideBar = () => {
        setOpenSideBar(!openSideBar)
    };
    const search = (e) => {
        if (e.keyCode == 13) {
            console.log(e.target.value);
            dispatch(actions.setSearch(e.target.value));
            navigate(`/cua-hang?search=${e.target.value}`);
            document.getElementById('search-field').value = '';
            setSearchBox(false);
        }
    }

    const handleSwitchLoginPage = async () => {
        // console.log(localStorage.getItem("token"));
        navigate('/dang-nhap');
    }
    const handleLogout = async () => {
        dispatch(actions.setLogin({
            role:'user',
            name:''
        }));
        navigate('/');
        console.log("logout manager")
        const res = await axios.post(
            'http://localhost:3001/auth/logout'
        )
        localStorage.removeItem("token");
    }
    return (
        <AppBar position="fixed" className={classes.root} style={{ height: `${nav.height}`, backgroundColor: `${nav.color}` }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ height: `${nav.height}` }}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <img src={logo} height={nav.height} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', minHeight: '60px' }}>
                        {menuList.map((page, index) => (
                            <Link style={{ textDecoration: 'none' }} to={page.path} key={index}>
                                <Button
                                    className={classes.item}
                                    key={index}
                                    sx={{ color: 'darkslateblue', display: 'block', px: 1, mx: 1, fontFamily: "'Roboto Mono', monospace", fontWeight: 800 }}
                                >
                                    {page.title}
                                </Button>
                            </Link>
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
                            <MenuIcon style={{ color: 'black' }} />
                        </IconButton>
                        <Paper
                            sx={paperStyle}
                            className={!openSideBar ? classes.hiddenSideBar : ''}
                        >
                            <MenuList>
                                {pagesMenu.map((page, index) => (
                                    <MenuItem key={index} onClick={handleOpenSideBar}>
                                        <Typography textAlign="center" color="gray" component="div">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Paper>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                        <img src={logo} height={nav.height} />
                    </Box>
                    <ClickAwayListener onClickAway={handleClickCloseSearch}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end', position: 'relative', width: '50px' }}>
                            {
                                state.account.role == "user" &&
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    onClick={handleOpenSearchField}
                                    color="inherit"
                                >
                                    <SearchOutlined style={{ color: 'gray' }} />
                                </IconButton>
                            }
                            {
                                state.account.role == "user" &&
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        color="inherit"
                                        sx={{ display: { xs: 'none', md: 'inline-block' } }}
                                        onClick={handleSwitchLoginPage}
                                    >
                                        <LoginIcon style={{ color: 'gray' }} />
                                    </IconButton>
                            }
                            {
                                state.account.role != "user" &&
                                <div style={{color:'blue', display:'flex', alignItems:'center', marginRight:'10px'}}>
                                    {`Xin chào, ${state.account.name}!`} &nbsp;
                                    <AccountCircleIcon color='disabled' fontSize='large'/>
                                    </div>
                            }
                            {
                                state.account.role !="user" &&
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    color="inherit"
                                    sx={{ display: { xs: 'none', md: 'inline-block' } }}
                                    onClick={handleLogout}
                                >
                                    <LogoutIcon style={{ color: 'gray' }} />
                                </IconButton>
                            }
                            <TextField
                                id='search-field'
                                component="div"
                                onKeyDown={search}
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
                                    borderRadius: '3px',
                                    overflow: 'hidden',
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
