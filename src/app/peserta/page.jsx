// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layoutpeserta from '../layoutpeserta';

import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';

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
        borderColor: 'rgba(255, 255, 255, 0.8)', // warna hover
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white', // warna hover
    },
}

export default function Login() {
    return (
    <Layoutpeserta>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                
                <Box component="form" 
                    sx={{ '& > :not(style)': { m: 0, p: 3, width: '100%' }, 
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '3px solid white' ,
                        borderRadius: 3,
                        textAlign: 'center',
                        p: 3
                    }}
                    noValidate
                    autoComplete="off">
                    <h1 className="text-2xl text-bold uppercase font-bold">Peserta</h1>
                    <TextField  type="text" id="nama" variant="outlined" required focused
                                placeholder="Nama..." label="Nama..."
                                fullWidth sx={styledTextField} />

                    <TextField  type="text" id="no_identitas" variant="outlined" required focused
                                placeholder="Nomor Identitas... (NIK / NIP / NISN)" label="Nomor Identitas... (NIK / NIP / NISN)"
                                fullWidth sx={styledTextField} />

                    <TextField  type="text" id="Email" variant="outlined" focused
                                placeholder="Email..." label="Email..."
                                fullWidth sx={styledTextField} />

                    <TextField  type="date" id="tgl_lahir" variant="outlined" required focused
                                placeholder="Tanggal Lahir..." label="Tanggal Lahir..."
                                fullWidth sx={styledTextField} />

                    <TextField  type="text" id="asal" variant="outlined" focused
                                placeholder="Asal..." label="Asal..."
                                fullWidth sx={styledTextField} />

                    <Box sx={{ '& button': { m: 1, width: '96%' } }}>
                        <Button variant="contained" size="large">
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    </Layoutpeserta>
    )
}