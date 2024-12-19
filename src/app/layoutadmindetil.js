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
  
    return (<div>{children}</div>);
}
