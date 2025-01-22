// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });
  
    return children
        ? React.cloneElement(children, {
            elevation: trigger ? 4 : 0,
        })
        : null;
}
  
ElevationScroll.propTypes = {
    children: PropTypes.element,
    window: PropTypes.func,
};

Appbarku.propTypes = {
    isback: PropTypes.boolean,
    url: PropTypes.string,
    headTitle: PropTypes.string,
};

export default function Appbarku(props) {
    const router = useRouter();
    const [islogin, setIslogin] = React.useState();
    const [isadmin, setIsadmin] = React.useState();
    const [isauth, setIsauth] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const menuItem_style = {
        color: '#000'
    }
  
    const getData = () => {
        try {
            if( Cookies.get('islogin') ) setIslogin(true);
            else setIslogin(false);

            if( Cookies.get('isadmin') ) setIsadmin(true);
            else setIsadmin(false);

            if( Cookies.get('isauth') ) setIsauth(true);
            else setIsauth(false);
        }
        catch(err) {
            console.error('Terjadi Kesalahan!');
            return err;
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const linkBack = (isback, url) => {
        if(isback) {
            return (
                <Link rel="follow" title={`Kembali`} href={url} onClick={() => router.push(url)} sx={{ marginRight : '10px' }}>
                    <ArrowBackIcon />
                </Link>
            );
        }
    }

    return (
        <React.StrictMode>
            <ElevationScroll {...props}>
                <AppBar sx={{ background: '#000' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            {linkBack(props.isback, props.url)}
                            <span className="">{props.headTitle}</span>
                        </Typography>
                        {islogin && isadmin && isauth ? (
                            <div className='right-0.5'>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem sx={menuItem_style}>
                                        <span className='mr-2'>{localStorage.getItem('nama')}</span>
                                    </MenuItem>
                                    <MenuItem onClick={(event) => router.push('/logout')} sx={menuItem_style}>
                                        <span className='mr-2'>Logout</span>
                                        <LogoutIcon size="small" />
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} sx={menuItem_style}>
                                        <span className='mr-2'>Tutup</span>
                                        <CloseIcon />
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : null}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.StrictMode>
    );
}