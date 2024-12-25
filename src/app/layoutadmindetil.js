// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

Layoutadmindetil.propTypes = {
    children: PropTypes.any,
};

export default function Layoutadmindetil({ children }) {
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
