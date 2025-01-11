// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// backgroundImage: 'url(https://fruitthemes.com/demo/impressive-wordpress-theme/wp-content/uploads/sites/2/2018/06/pexels-photo-247474.jpeg)',
// backgroundSize: 'cover',
// backgroundRepeat: 'no-repeat',

RootLayout.propTypes = {
  children: PropTypes.any,
};

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                style={{
                  backgroundColor: 'rgba(50, 50, 100, 1)',
                }}
            >
                <React.StrictMode>
                    {children}
                </React.StrictMode>
            </body>
        </html>
      
    );
}
