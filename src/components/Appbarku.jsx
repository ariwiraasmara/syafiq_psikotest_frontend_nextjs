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

const linkBack = (isback) => {
    if(isback) {
        return <Link onClick={() => history.back()} sx={{ marginRight : '10px' }} ><ArrowBackIcon /></Link>
    }
}
  
export default function Appbarku(props) {
    return (<div>
        <ElevationScroll {...props}>
          <AppBar sx={{ background: '#000' }}>
            <Toolbar>
              <Typography variant="h5" component="div" className="font-bold">
                {linkBack(props.isback)}
                <span className="font-bold">{props.headTitle}</span>
              </Typography>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
    </div>);
}