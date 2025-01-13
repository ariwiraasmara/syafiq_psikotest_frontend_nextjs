// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';
import * as React from 'react';
import Cookies from 'js-cookie';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';

const Myhelmet = dynamic(() => import('@/components/Myhelmet'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const NavBreadcrumb = dynamic(() => import('@/components/NavBreadcrumb'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
import { random } from '@/libraries/myfunction';

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
        if(localStorage.getItem('ispeserta') != 'true' || localStorage.getItem('ispeserta') == 'false' || !localStorage.getItem('ispeserta')) {
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
                        'X-API-KEY': 'lBvYGhtKWqbQ6ZspV8txNRTcINTHEJSg24q5lpUjPF2dYkKIG3evFCniewMbwPuLzrmcJzkAXOf1HUEj767Q9onCmdR30s9XWLig',
                        'XSRF-TOKEN': csrfToken,
                        'tokenlogin': random('combwisp', 50)
                    }
                });

                console.info(response.data.pesan);
                if(response.data.success) {
                    Cookies.set('islogin', true, { expires: 6, path: 'syafiq.psikotest', secure: true, sameSite: 'strict' });
                    Cookies.set('isadmin', true, { expires: 6, path: 'syafiq.psikotest', secure: true, sameSite: 'strict' });
                    Cookies.set('isauth', true, { expires: 6, path: 'syafiq.psikotest', secure: true, sameSite: 'strict' });
                    localStorage.setItem('islogin', true);
                    localStorage.setItem('isadmin', true);
                    localStorage.setItem('ispeserta', false);
                    // localStorage.setItem('authUser', JSON.stringify({
                    //     nama: response.data.data.nama,
                    //     email: emaillogin,
                    //     pat: response.data.data.token_1,
                    //     rememberToken: response.data.data.token_2
                    // }));
                    localStorage.setItem('nama', response.data.data.nama);
                    localStorage.setItem('email', emaillogin);
                    localStorage.setItem('pat', response.data.data.token_1);
                    localStorage.setItem('remember-token', response.data.data.token_2);
                    localStorage.setItem('csrfToken', csrfToken);
                    return router.push('/admin/dashboard');
                }
                alert('Email / Password Salah!');
                setLoading(false);
            }
            catch(err) {
                console.info(err);
                alert('Terjadi Kesalahan!');
                setLoading(false);
            }
        }
        alert('Tidak Bisa Login!');
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if(localStorage.getItem('islogin') && localStorage.getItem('isadmin')) window.location.href= '/admin/dashboard';
    }, []);

    if(loading) {
        return (
            <h2 className='text-center'>
                <p><span className='font-bold text-2lg'>
                    Sedang memuat data... Mohon Harap Tunggu...
                </span></p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    const MemoHelmet = React.memo(function Memo() {
        return(
            <Myhelmet
                title={`Login Admin | Psikotest Online App`}
                pathURL={`/admin`}
                robots={`index, follow, snippet, max-snippet:99, max-image-preview:standard, noarchive, notranslate`}
                onetime={null}
            />
        );
    });

    const MemoNavBreadcrumb = React.memo(function Memo() {
        return(
            <NavBreadcrumb content={`Admin`} hidden={`hidden`} />
        );
    });

    const MemoFooter = React.memo(function Memo() {
        return(
            <Footer />
        );
    });

    return (
        <>
            <MemoHelmet />
            <MemoNavBreadcrumb />
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" >
                <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
                        <h1 className="hidden">Halaman Login | Admin</h1>
                        <span className="text-2xl text-bold uppercase font-bold">Login Admin</span>
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
                            <div>
                                <Button variant="contained" size="large" color="primary" fullWidth type="submit">
                                    Login
                                </Button>
                            </div>
                            <div className='mt-4'>
                                <Button variant="contained" size="large" color="secondary" fullWidth href="/" title="Beranda" rel="follow" type="button">
                                    Kembali
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </div>
            </div>
            <MemoFooter />
        </>
    );
}