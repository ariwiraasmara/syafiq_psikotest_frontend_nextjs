// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import RootLayout from '../../app/layout';
import * as React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

Layout.propTypes = {
  children: PropTypes.any,
};

export default function Layout({ children }) {
    return (
        <React.StrictMode>
            <RootLayout>
                {children}
            </RootLayout>
        </React.StrictMode>
    );
}
