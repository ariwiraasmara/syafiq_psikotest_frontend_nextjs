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
                                <tr className="border-2 border-white p-6 mt-4">
                                    <td className="border-2 border-white">{props.soalA}</td>
                                    <td className="border-2 border-white">{props.soalB}</td>
                                    <td className="border-2 border-white">{props.soalC}</td>
                                    <td className="border-2 border-white">{props.soalD}</td>
                                    <td className="border-2 border-white">{props.soalE}</td>
                                </tr>
                                <tr className="border-2 border-white p-6">
                                    <td className="border-2 border-white font-bold">A</td>
                                    <td className="border-2 border-white font-bold">B</td>
                                    <td className="border-2 border-white font-bold">C</td>
                                    <td className="border-2 border-white font-bold">D</td>
                                    <td className="border-2 border-white font-bold">E</td>
                                </tr>
                                <tr className="mt-4">
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