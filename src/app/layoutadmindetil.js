// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';

export default function RootLayout({ children }) {
    const [islogin, setIslogin] = React.useState();
    const [isadmin, setIsadmin] = React.useState();

    React.useEffect(() => {
        setIslogin(localStorage.getItem('islogin'));
        setIsadmin(localStorage.getItem('isadmin'));
    }, [islogin, isadmin]);
  
    return (
        <div>
            {children}
        </div>
    );
}
