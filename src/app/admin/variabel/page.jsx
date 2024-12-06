// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../layoutadmin';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
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
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
  
export default function Dashboard(props) {
    return (
        <Layoutadmin>
            <ElevationScroll {...props}>
                <AppBar sx={{ background: '#000' }}>
                    <Toolbar>
                        <Typography variant="h5" component="div" className="font-bold">
                            Variabel
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
                <main className="p-5 mb-14">
                    <div>
                        <h1 className="text-xl font-bold">Selamat Datang</h1>
                    </div>
                </main>
            
        </Layoutadmin>
    )
}