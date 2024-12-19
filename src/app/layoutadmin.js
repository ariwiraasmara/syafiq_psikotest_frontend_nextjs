// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
import NavigasiBawah from '@/components/BottomNavigation';

export default function RootLayout({ children }) {
    const router = useRouter();
    const [islogin, setIslogin] = React.useState();
    const [isadmin, setIsadmin] = React.useState();

    React.useEffect(() => {
        setIslogin(localStorage.getItem('islogin'));
        setIsadmin(localStorage.getItem('isadmin'));
    }, [islogin, isadmin]);
    // console.log('islogin', islogin);
    // console.log('isadmin', isadmin);
  
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
