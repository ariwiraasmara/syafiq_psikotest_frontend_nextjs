// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import RootLayout from '../../app/layout';
import * as React from 'react';
import PropTypes from 'prop-types';
import localFont from "next/font/local";
import "../../app/globals.css";

const geistSans = localFont({
  src: "../../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

Layout.propTypes = {
  children: PropTypes.any,
};

export default function Layout({ children }) {
    return (
      <React.StrictMode>
          {children}
      </React.StrictMode>
    );
}
