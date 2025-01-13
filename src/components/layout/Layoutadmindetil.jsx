// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import localFont from "next/font/local";
import "../../app/globals.css";

const geistSans = localFont({
  src: "../../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

Layoutadmindetil.propTypes = {
    children: PropTypes.any,
};

export default function Layoutadmindetil({ children }) {
    const [loading, setLoading] = React.useState(true);
    const [islogin, setIslogin] = React.useState();
    const [isadmin, setIsadmin] = React.useState();
    const [ispeserta, setIspeserta] = React.useState(false);

    const getData = () => {
        setLoading(true);
        try {
            if(localStorage.getItem('islogin') === 'true') setIslogin(true);
            else setIslogin(false);

            if(localStorage.getItem('isadmin') === 'true') setIsadmin(true);
            else setIsadmin(false);

            if(localStorage.getItem('ispeserta') === 'false') setIspeserta(false);
            else setIspeserta(false);
        }
        catch(err) {
            console.error('Terjadi Kesalahan!');
            return err;
        }
        setLoading(false);
    }

    React.useEffect(() => {
        getData();
    }, [islogin, isadmin, ispeserta]);

    if(loading) {
        return (
            <h2 className='text-center p-8'>
                <p><span className='font-bold text-2lg'>
                    Sedang memuat data... Mohon Harap Tunggu...
                </span></p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    if(ispeserta) return window.location.href = '/peserta';

    if(islogin && isadmin) {
        return (
            <React.StrictMode>
                {children}
            </React.StrictMode>
        );
    }
    else {
        return (
            <div className='text-center p-20'>
                <h1 className='text-2xl text-bold uppercase font-bold'>Unauthorized!</h1>
                <p className='mt-4 uppercase font-bold'>Tidak diperkenankan untuk mengakses halaman ini!</p>
                <div className='mt-6'>
                    <Box sx={{ '& button': {width: '100%' } }}>
                        <Button variant="contained" size="large" onClick={() => router.push('/admin')}>
                            Kembali
                        </Button>
                    </Box>
                </div>
            </div>
        );
    }
}
