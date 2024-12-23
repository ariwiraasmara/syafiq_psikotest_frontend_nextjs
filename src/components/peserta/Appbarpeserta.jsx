// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

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

export default function Appbarpeserta(props) {
    return (
    <div>
        <React.StrictMode>
            <ElevationScroll {...props}>
                <AppBar sx={{ background: '#000' }}>
                    <Toolbar>
                        <table align="center">
                            <tbody>
                                <tr>
                                    <th colSpan="5">{props.kolom_x}</th>
                                </tr>
                                <tr>
                                    <td>{props.soalA}</td>
                                    <td>{props.soalB}</td>
                                    <td>{props.soalC}</td>
                                    <td>{props.soalD}</td>
                                    <td>{props.soalE}</td>
                                </tr>
                                <tr>
                                    <td>A</td>
                                    <td>B</td>
                                    <td>C</td>
                                    <td>D</td>
                                    <td>E</td>
                                </tr>
                                <tr>
                                    <th colSpan="5">{props.timer}</th>
                                </tr>
                            </tbody>
                        </table>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.StrictMode>
    </div>
    );
}