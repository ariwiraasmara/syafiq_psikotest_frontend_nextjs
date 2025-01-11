// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';

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

    const linkBack = (isback, url) => {
        if(isback) {
            return (
                <Link onClick={() => router.push(url)} sx={{ marginRight : '10px' }} >
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
                        <Typography variant="h5" component="div" className="font-bold">
                            {linkBack(props.isback, props.url)}
                            <span className="font-bold">{props.headTitle}</span>
                            <nav id="breadcrumb">{props.path}</nav>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.StrictMode>
    );
}