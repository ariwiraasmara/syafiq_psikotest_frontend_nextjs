// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutadmin from '../../../layoutadmin';
import axios from 'axios';
import * as React from 'react';
import { useSearchParams } from 'next/navigation'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Container from '@mui/material/Container';

const styledTextField = {
    '& .MuiOutlinedInput-notchedOutline': {
        border: '2px solid rgba(255, 255, 255, 0.9)',
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-placeholder': {
        color: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(000, 000, 000, 0.8)', // warna hover
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white', // warna hover
    },
}

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

export default function EditVariabel(props) {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramID = urlParams.get('id');

    const [data, setData] = React.useState([]);
    const [nid, setNid] = React.useState();
    const [nvariabel, setNvariabel] = React.useState();
    const [nvalues, setNvalues] = React.useState();

    const getData = async () => {
        try {
            const response = await axios.get(`http://127.0.1:8000/api/variabel-setting/${paramID}`);
            setData(response.data.data);
            
        } catch (err) {
            return err;
            // console.error(err);
        }
    }
    
    React.useEffect(() => {
        getData();
        setNid(data[0]?.id);
        setNvariabel(data[0]?.variabel);
        setNvalues(data[0]?.values);
    }, [nid,
        nvariabel,
        nvalues]);

    // setNid(data[0]?.id);
    // setNvariabel(data[0]?.variabel);
    // setNvalues(data[0]?.values);
    // let nid = data[0]?.id;
    // let nvariabel = data[0]?.variabel;
    // let nvalues = data[0]?.values;
    console.log(nvariabel);

    return (
        <Layoutadmin>
            <ElevationScroll {...props}>
                <AppBar sx={{ background: '#000' }}>
                    <Toolbar>
                        <Typography variant="h5" component="div" className="font-bold">
                            Edit Variabel
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <main className="p-5 mb-14">
            <Box component="form"
                    sx={{ '& > :not(style)': { m: 0, p: 1, width: '50%' },
                        p: 3
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField  type="text" id="variabel" variant="standard"
                                placeholder="Variabel..." label="Variabel..."
                                fullWidth sx={styledTextField}
                                values={data[0]?.variabel} />
                    <TextField  type="text" id="values" variant="standard"
                                placeholder="Nilai..." label="Nilai..."
                                fullWidth sx={styledTextField}
                                values={nvalues} />

                    <Box sx={{ '& button': { m: 1, width: '200%' } }}>
                        <Button variant="contained" size="large">
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </main>
        </Layoutadmin>
    )
}