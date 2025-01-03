// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigasiBawah from '@/components/BottomNavigation';

Layoutadmin.propTypes = {
    children: PropTypes.any,
};

export default function Layoutadmin({ children }) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [islogin, setIslogin] = React.useState();
    const [isadmin, setIsadmin] = React.useState();
    const [ispeserta, setIspeserta] = React.useState(false);

    const getData = () => {
        setLoading(true);
        try {
            setIslogin(localStorage.getItem('islogin'));
            setIsadmin(localStorage.getItem('isadmin'));
            setIspeserta(localStorage.getItem('ispeserta'));
        }
        catch(err) {
            console.error('Terjadi Kesalahan!');
            return err;
        }
        setLoading(false);
    }

    React.useEffect(() => {
        getData();
    }, [router, islogin, isadmin]);

    if(loading) {
        return (
            <div className='text-center p-8'>
                <p><span className='font-bold text-2lg'>Loading...</span></p>
            </div>
        );
    }

    if(ispeserta) return window.location.href = '/peserta';

    if(islogin && isadmin) {
        const MemoNavigasiBawah = React.memo(function Memo() {
            return <NavigasiBawah />;
        });
        return (
            <div>
                {children}
                <MemoNavigasiBawah />
            </div>
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
