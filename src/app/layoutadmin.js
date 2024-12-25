// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import NavigasiBawah from '@/components/BottomNavigation';

Layoutadmin.propTypes = {
    children: PropTypes.any,
  };

export default function Layoutadmin({ children }) {
    const router = useRouter();
    const [islogin, setIslogin] = React.useState();
    const [isadmin, setIsadmin] = React.useState();

    React.useEffect(() => {
        setIslogin(localStorage.getItem('islogin'));
        setIsadmin(localStorage.getItem('isadmin'));
    }, [router, islogin, isadmin]);

    return(
        <div>
            {children}
            <NavigasiBawah />
        </div>
    );

    /*
    if(islogin && isadmin) {
        return (
            <div>
                {children}
                <NavigasiBawah />
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
    */
}
