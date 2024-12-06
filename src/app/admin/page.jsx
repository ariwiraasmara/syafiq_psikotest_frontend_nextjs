// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
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
        borderColor: 'rgba(000, 000, 000, 0.8)', // warna hover
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white', // warna hover
    },
}

export default function Login() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                
                <Box component="form" 
                    sx={{ '& > :not(style)': { m: 0, p: 1, width: '100%' }, 
                        backgroundColor: 'rgba(125, 150, 255, 0.2)',
                        border: '3px solid white' ,
                        borderRadius: 3,
                        textAlign: 'center',
                        p: 3
                    }}
                    noValidate
                    autoComplete="off">
                    <h1 className="text-2xl text-bold uppercase font-bold">L o g i n</h1>
                    <TextField  type="email" id="email" variant="outlined" 
                                placeholder="Email..."
                                fullWidth sx={styledTextField}
                                slotProps={{
                                    input: {
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <EmailIcon sx={{ color: 'white' }} />
                                        </InputAdornment>
                                      ),
                                    },
                                }} />
                    <TextField  type="password" id="password" variant="outlined" 
                                placeholder="Password..."
                                fullWidth sx={styledTextField}
                                slotProps={{
                                    input: {
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <LockPersonIcon sx={{ color: 'white' }} />
                                        </InputAdornment>
                                      ),
                                    },
                                }} />

                    <Box sx={{ '& button': { m: 1, width: '96%' } }}>
                        <Button variant="contained" size="large">
                            Login
                        </Button>
                    </Box>
                </Box>
            </main>
        </div>
    )
}