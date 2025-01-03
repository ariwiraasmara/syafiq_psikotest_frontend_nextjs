// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';
import * as React from 'react';
import Cookies from 'js-cookie'
import useSignIn from 'react-auth-kit/hooks/useSignIn';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import fun from '@/libraries/myfunction';
import { generateKey, encryptData } from '@/libraries/crypto';
import { ErrorOutlineOutlined } from '@mui/icons-material';

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

export default function Admin() {
    const router = useRouter();
    const [emaillogin, setEmaillogin] = React.useState('');
    const [passlogin, setPasslogin] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!localStorage.getItem('ispeserta')) {
            try {
                axios.defaults.withCredentials = true;
                axios.defaults.withXSRFToken = true;
                const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                });
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, {
                    email: emaillogin,
                    password: passlogin
                }, {
                    withCredentials: true,  // Mengirimkan cookie dalam permintaan
                    headers: {
                        'Content-Type': 'application/json',
                        'XSRF-TOKEN': csrfToken,
                        'tokenlogin': fun.random('combwisp', 50)
                    }
                });

                if(response.data.success) {
                    console.info(response.data.pesan);
                    // Cookies.set('islogin', true, { expires: 6, path: 'syafiq.psikotest', secure: true, sameSite: 'strict' })
                    // Cookies.set('isadmin', true, { expires: 6, path: 'syafiq.psikotest', secure: true, sameSite: 'strict' })
                    localStorage.setItem('islogin', true);
                    localStorage.setItem('isadmin', true);
                    localStorage.setItem('email', emaillogin);
                    localStorage.setItem('nama', response.data.data.nama);
                    localStorage.setItem('pat', response.data.data.token_1);
                    localStorage.setItem('remember-token', response.data.data.token_2);
                    localStorage.setItem('csrfToken', csrfToken);
                    sessionStorage.setItem('nav_id', 1);
                    return router.push('/admin/dashboard');
                }
                return alert('Email / Password Salah!');
            }
            catch(err) {
                console.error(err);
                return alert('Terjadi Kesalahan!');
            }
        }
        alert('Tidak Bisa Login!');
        setLoading(false);
    };

    React.useEffect(() => {
        if(localStorage.getItem('islogin') && localStorage.getItem('isAdmin')) window.location.href= '/admin/dashboard';
    }, []);

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Login Admin | Psikotest Online App`}
                description={`Halaman Login Admin.`}
                pathURL={`admin`}
                onetime={true}
            />
        );
    });

    if(loading) {
        return (
            <div className='text-center p-8'>
                <p><span className='font-bold text-2lg'>Loading...</span></p>
            </div>
        );
    }

    return (
        <div>
            <MemoHelmet />
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <Box component="form"
                        onSubmit={(e) => submit(e)}
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
                                    defaultValue={emaillogin}
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
                                    defaultValue={passlogin}
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
                        <Box sx={{ m: 1 }}>
                            <Button variant="contained" size="large" fullWidth type="submit">
                                Login
                            </Button>
                        </Box>
                    </Box>
                </main>
            </div>
        </div>
    );
}