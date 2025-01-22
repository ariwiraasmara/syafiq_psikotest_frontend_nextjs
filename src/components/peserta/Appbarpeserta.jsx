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

Appbarpeserta.propTypes = {
    kolom_x: PropTypes.string,
    timer: PropTypes.string,
    soalA: PropTypes.number,
    soalB: PropTypes.number,
    soalC: PropTypes.number,
    soalD: PropTypes.number,
    soalE: PropTypes.number
};

export default function Appbarpeserta(props) {
    return (
        <React.StrictMode>
            <ElevationScroll {...props}>
                <AppBar sx={{ background: '#000' }}>
                    <Toolbar>
                        <h2 className='hidden'>Pertanyaan Psikotest Kecermatan {props.kolom_x}</h2>
                        <table align="center">
                            <thead className='hidden'>
                                <tr><th><h3>Table Pertanyaan Psikotest Kecermatan {props.kolom_x}</h3></th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th colSpan="5">{props.kolom_x}</th>
                                </tr>
                                <tr className="border-2 border-white mt-4">
                                    <td className="p-2 border-2 border-white">{props.soalA}</td>
                                    <td className="p-2 border-2 border-white">{props.soalB}</td>
                                    <td className="p-2 border-2 border-white">{props.soalC}</td>
                                    <td className="p-2 border-2 border-white">{props.soalD}</td>
                                    <td className="p-2 border-2 border-white">{props.soalE}</td>
                                </tr>
                                <tr className="border-2 border-white">
                                    <td className="p-2 border-2 border-white font-bold">A</td>
                                    <td className="p-2 border-2 border-white font-bold">B</td>
                                    <td className="p-2 border-2 border-white font-bold">C</td>
                                    <td className="p-2 border-2 border-white font-bold">D</td>
                                    <td className="p-2 border-2 border-white font-bold">E</td>
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
    );
}