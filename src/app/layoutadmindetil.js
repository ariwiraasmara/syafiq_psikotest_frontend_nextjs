// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

Layoutadmindetil.propTypes = {
    children: PropTypes.any,
};

export default function Layoutadmindetil({ children }) {
    const [loading, setLoading] = React.useState(true);
    const [islogin, setIslogin] = React.useState();
    const [isadmin, setIsadmin] = React.useState();

    React.useEffect(() => {
        setLoading(true);
        setIslogin(localStorage.getItem('islogin'));
        setIsadmin(localStorage.getItem('isadmin'));
        setLoading(false);
    }, [islogin, isadmin]);

    if(loading) {
        return (
            <div className='text-center p-8'>
                <p><span className='font-bold text-2lg'>Loading...</span></p>
            </div>
        );
    }

    if(islogin && isadmin) {
        return (
            <div>
                {children}
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
