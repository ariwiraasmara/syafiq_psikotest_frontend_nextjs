// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import fun from '@/libraries/myfunction';

const styledTextField = {
    '& .MuiStandardInput-notchedStandard': {
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
    '&:hover .MuiStandardInput-notchedStandard': {
        borderColor: 'rgba(255, 255, 255, 0.8)', // warna hover
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white', // warna hover
    },
}

export default function NewOrEdit() {
    const [loading, setLoading] = React.useState(false);
    const [nvariabel, setNvariabel] = React.useState('');
    const handleChange_Nvariable = (event) => {
        setNvariabel(event.target.value);
        console.log(nvariabel);
    };

    const [nvalues, setNvalues] = React.useState();
    const handleChange_Nvalues = (event) => {
        setNvalues(event.target.value);
        console.log(nvalues);
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/variabel-setting`, {
                variabel: nvariabel,
                values: nvalues
            }, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
                headers: {
                    'Content-Type': 'application/json',
                    'XSRF-TOKEN': csrfToken,
                    'islogin' : fun.readable(localStorage.getItem('islogin')),
                    'isadmin' : fun.readable(localStorage.getItem('isadmin')),
                    'Authorization': `Bearer ${fun.readable(localStorage.getItem('pat'))}`,
                    'remember-token': fun.readable(localStorage.getItem('remember-token')),
                    'tokenlogin': fun.random('combwisp', 50),
                    'email' : fun.readable(localStorage.getItem('email')),
                    '--unique--': 'I am unique!',
                    'isvalid': 'VALID!',
                    'isallowed': true,
                    'key': 'key',
                    'values': 'values',
                    'isdumb': 'no',
                    'challenger': 'of course',
                    'pranked': 'absolutely'
                }
            });
    
            console.log('response', response);
            if(response.data.success) {
                location.reload();
            }
            else {
                return alert('Terjadi Kesalahan Variabel');
            }
        }
        catch(er) {
            console.log('Terjadi Kesalahan Mengirim Data Variabel', er);
            return alert('Terjadi Kesalahan Mengirim Data Variabel');
        }
        setLoading(false);
    };

    if(loading) {
        return (
            <div className='text-center p-8'>
                <p>
                    <span className='font-bold text-2lg'>
                        Loading...<br/>
                        Sedang mengirim dan menyimpan data
                    </span>
                </p>
            </div>
        );
    }

    return (
        <Box component="form"
            sx={{ '& > :not(style)': { m: 0, p: 1, width: '100%' },
                p: 3,
            }}
            noValidate
            onSubmit={(e) => submit(e)}
            autoComplete="off">
            <TextField  type="text" id={`variabel`} variant="standard" size="small"
                        placeholder="Variabel..." label="Variabel..."
                        fullWidth sx={styledTextField}
                        onChange={handleChange_Nvariable} />
            <TextField  type="text" id={`values`} variant="standard" size="small"
                        placeholder="Nilai..." label="Nilai..."
                        fullWidth sx={styledTextField}
                        onChange={handleChange_Nvalues} />
            <Box sx={{ m: 1 }}>
                <Button variant="contained" size="large" fullWidth type="submit">
                    Simpan
                </Button>
            </Box>
        </Box>
    )
}