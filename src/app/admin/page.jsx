// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import base_url from '../../api/api';
import { useSession } from "next-auth/react"
import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';

import Myhelmet from '@/components/Myhelmet';

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

export default function Admin(props) {
    const [emaillogin, setEmaillogin] = React.useState('');
    const [passlogin, setPasslogin] = React.useState('');

    async function myFunction() {
        const csrfToken = await getCsrfToken();
        /* ... */
        return csrfToken;
    }

    async function submitLogin() {
        console.log('submitlogin triggered');
        console.log(`email ${emaillogin}`);
        console.log(`password ${passlogin}`);
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, {
        //     email: emaillogin,
        //     password: passlogin,
        //     tokenlogin: Math.random()
        // }, {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'X-XSRF-TOKEN': token
        //     }
        // });
        // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
        // xsrfCookieName: 'XSRF-TOKEN', // default
        // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
        // xsrfHeaderName: 'X-XSRF-TOKEN', // default
        // console.log('response', response);
        // Cookies.set('token', token);

        const url = `${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`;
        const data = {
            email: emaillogin,
            password: passlogin,
            tokenlogin: Math.random()
        };

        const jsonData = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-XSRF-TOKEN', token);

        await fetch(url, {
            method: 'POST',
            headers: headers,
            body: jsonData,
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    React.useEffect(() => {
        // submitLogin();
    }, []);

    return (
    <div>
        <Myhelmet 
            title={`Login Admin | Psikotest Online App`}
            description={`Psikotest Online App`}
            keywords={`Psikotest, Javascript, ReactJS, NextJS, MUI, Material UI, Tailwind`}
        />
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
                    <TextField  type="email" id="email-login" variant="outlined"
                                placeholder="Email..."
                                fullWidth sx={styledTextField}
                                onChange = {(event)=> setEmaillogin(event.target.value)}
                                slotProps={{
                                    input: {
                                      startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: 'white' }} />
                                        </InputAdornment>
                                      ),
                                    },
                                }} />
                    <TextField  type="password" id="pass-login" variant="outlined"
                                placeholder="Password..."
                                fullWidth sx={styledTextField}
                                onChange = {(event)=> setPasslogin(event.target.value)}
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
                        <Button variant="contained" size="large" onClick={() => submitLogin()}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </main>
        </div>
    </div>
    );
}