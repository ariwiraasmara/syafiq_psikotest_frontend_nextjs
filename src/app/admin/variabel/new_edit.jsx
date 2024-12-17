// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import axios from 'axios';
import * as React from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const styledTextField = {
    '& .MuiStandardInput-notchedOutline': {
        color: '#fff',
    },
    '& .MuiInputLabel-root': {
        color: '#fff',
    },
    '& .MuiStandardInput-input': {
        color: '#fff',
    },
    '& .MuiStandardInput-placeholder': {
        color: '#fff',
    },
    '&:hover .MuiStandardInput-notchedOutline': {
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

export default function NewOrEdit(props) {

    const [nmethod, setNmethod] = React.useState('');
    const [nvariabel, setNvariabel] = React.useState('');
    const [nvalues, setNvalues] = React.useState();
    const [url, setUrl] = React.useState('');
    if(props.type === 'new') {
        setUrl('https://127.0.0.1:8000/api/variabel-setting');
        setNmethod('POST');
    }
    else if(props.type === 'edit') {
        setUrl(`https://127.0.0.1:8000/api/variabel-setting/${props.id}`);
        setNmethod('PUT');
        setNvariabel(props.nvariabel);
        setNvalues(props.nvalues);
    }

    const submit = async () => {
        console.log('submit post variabel-setting triggered');
        console.log(`method ${method}`);
        console.log(`email ${nvariabel}`);
        console.log(`password ${nvalues}`);
        const response = await axios.post(url, {
            _method: nmethod,
            variabel: nvariabel,
            values: nvalues,
            tokenlogin: Math.random()
        });
        console.log('response', response);
    }

    const handleChange_Nvariable = (event, index) => {
        setNvariabel(event.target.value);
    };

    const handleChange_Nvalues = (event, index) => {
        setNvalues(event.target.value);
    };

    return (
        <Box component="form"
            sx={{ '& > :not(style)': { m: 0, p: 1, width: '33%' },
                p: 3,
            }}
            noValidate
            autoComplete="off">
            <TextField  type="text" id={`variabel-${props.nvariabel}`} variant="standard" size="small"
                        placeholder="Variabel..." label="Variabel..."
                        fullWidth sx={styledTextField}
                        onChange={handleChange_Nvariable}
                        defaultValue={props.nvariabel} />

            <TextField  type="text" id={`variabel-${props.nvalues}`} variant="standard" size="small"
                        placeholder="Nilai..." label="Nilai..."
                        fullWidth sx={styledTextField}
                        onChange={handleChange_Nvalues}
                        defaultValue={props.nvalues} />

            <Button type="submit" variant="contained" size="small" onClick={() => submit()}>
                Simpan
            </Button>
        </Box>
    )
}