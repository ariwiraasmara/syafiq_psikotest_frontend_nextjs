// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layout from '../../app/layout';
import * as React from 'react';
import Cookies from 'js-cookie'
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const NavigasiBawah = dynamic(() => import('@/components/admin/NavigasiBawah'), {
    ssr: false,  // Menonaktifkan SSR untuk komponen ini
});
Layoutadmin.propTypes = {
    children: PropTypes.any,
};
import { currentDate } from '@/libraries/myfunction';

export default function Layoutadmin({ children }) {
    const router = useRouter();
    const textColor = localStorage.getItem('text-color');
    const borderColor = localStorage.getItem('border-color');
    const [loading, setLoading] = React.useState(true);
    const [islogin, setIslogin] = React.useState();
    const [isadmin, setIsadmin] = React.useState();
    const [isauth, setIsauth] = React.useState();
    const [expireSession, setExpireSession] = React.useState('');
    const [ispeserta, setIspeserta] = React.useState(false);
    const [cDate, setCDate] = React.useState(currentDate(null));

    const getData = () => {
        setLoading(true);
        try {
            if( Cookies.get('islogin') ) setIslogin(true);
            else setIslogin(false);

            if( Cookies.get('isadmin') ) setIsadmin(true);
            else setIsadmin(false);

            if( Cookies.get('isauth') ) setIsauth(true);
            else setIsauth(false);

            if( Cookies.get('ispeserta') ) setIspeserta(true);
            else setIspeserta(false);

            setExpireSession(localStorage.getItem('sesi_admin'));
        }
        catch(err) {
            console.error('Terjadi Kesalahan!');
            return err;
        }
        setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        getData();
        setCDate(currentDate(null));
        if(expireSession.expire_at === cDate) {
            router.push('/logout');
        }
    }, [cDate, islogin, isadmin, isauth, ispeserta]);

    if(loading) {
        return (
            <h2 className={`text-center p-8 ${textColor}`}>
                <p><span className='font-bold text-2lg'>
                    Sedang memuat data... Harap Tunggu...
                </span></p>
                <CircularProgress color="info" size={50} />
            </h2>
        );
    }

    if(ispeserta) return window.location.href = '/peserta';

    if(islogin && isadmin && isauth) {
        const MemoNavigasiBawah = React.memo(function Memo() {
            return <NavigasiBawah />;
        });
        return (
            <React.StrictMode>
                {children}
                <MemoNavigasiBawah />
            </React.StrictMode>
        );
    }
    else {
        return (
            <div className={`text-center p-20 ${textColor}`}>
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
