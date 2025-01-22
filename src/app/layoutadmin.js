// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import Layout from './layout';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigasiBawah from '@/components/admin/NavigasiBawah';

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
    }, [router, islogin, isadmin, ispeserta]);

    if(loading) {
        return (
            <Layout>
                <div className='text-center p-8'>
                    <p><span className='font-bold text-2lg'>Loading...</span></p>
                </div>
            </Layout>
        );
    }

    if(ispeserta) return window.location.href = '/peserta';

    if(islogin && isadmin) {
        const MemoNavigasiBawah = React.memo(function Memo() {
            return <NavigasiBawah />;
        });
        return (
            <Layout>
                {children}
                <MemoNavigasiBawah />
            </Layout>
        );
    }
    else {
        return (
            <Layout>
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
            </Layout>
        );
    }
    
}
