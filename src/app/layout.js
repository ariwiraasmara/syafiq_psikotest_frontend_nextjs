// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import "./globals.css";
import * as React from 'react';
import localFont from "next/font/local";
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

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
    const [onetime, setOnetime] = React.useState();
    const [csrf, setCsrf] = React.useState();
    const [token, setToken] = React.useState();
    const [unique, setUnique] = React.useState();

    const generateToken = async() => {
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const csrfToken = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/generate-token-first`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan\
                headers: {
                  'Content-Type': 'application/json',
                  'XSRF-TOKEN': csrfToken,
              }
            });
            setOnetime(true);
            setCsrf(response1.data.data.csrfToken);
            setToken(response1.data.data.token);
            setUnique(response1.data.data.unique);
        } catch (err) {
            console.error('Error Get Token', err);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        generateToken();
    }, []);

    const OnetimeToken = () => {
      if(onetime) {
          <>
              <meta name="XSRF-TOKEN" content={csrf} />
              <meta name="__token__" content={token} />
              <meta name="__unique__" content={unique} />
          </>
      }
    }

    return (
        <html lang="id">
            <head>
                <meta charSet="utf-8" />
                <title>{localStorage.getItem('page-title')}</title>
                <meta property="og:title" content={localStorage.getItem('page-title')} />
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_FRONTEND}${localStorage.getItem('page-url')}`} />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND}${localStorage.getItem('page-url')}`} />
                <link rel="breadcrumb" href={`${process.env.NEXT_PUBLIC_FRONTEND}${localStorage.getItem('page-url')}`} />
                <meta name="robots" content={localStorage.getItem('page-robots')} />

                <meta name="description" content="Syafiq Psikotest Online App, adalah aplikasi psikotest berbasis online web, dimana dapat diakses di perangkat manapun, baik untuk admin dan peserta psikotest." />
                <meta property="og:description" content="Syafiq Psikotest Online App, adalah aplikasi psikotest berbasis online web, dimana dapat diakses di perangkat manapun, baik untuk admin dan peserta psikotest." />
                <meta name="keywords" content="Psikotest, Javascript, React.JS, Next.JS, MUI.JS, Material UI, Tailwind, Node.JS, Bun, Million.JS, Chart.JS, SweetAlert2.JS, Axios, Frontend UI/UX" />
                <meta name="author" content="Syafiq. Syahri Ramadhan Wiraasmara (ARI)" />
                <meta name="publisher" content="Syafiq. Syahri Ramadhan Wiraasmara (ARI)" />
                <meta name="developer" content="Syahri Ramadhan Wiraasmara (ARI)" />
                <link rel="author" href="https://github.com/ariwiraasmara" />
                <link rel="repository" href="https://github.com/ariwiraasmara/syafiq_psikotest_frontend_nextjs" />
                <link rel="license" href="https://github.com/ariwiraasmara/syafiq_psikotest_frontend_nextjs?tab=AGPL-3.0-1-ov-file#" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:type" content="application, website" />
                <meta property="og:locale" content="id_ID" />
                <meta name="theme-color" content="#323264" />

                {/* Nanti url href diubah dan disesuaikan */}
                <link rel="icon" href="/favicon.ico?favicon.45db1c09.ico" sizes="256x256" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/favicon.ico?favicon.45db1c09.ico" />
                <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/favicon.ico?favicon.45db1c09.ico" />
                <meta property="og:image" content="/favicon.ico?favicon.45db1c09.ico" />
                
                <OnetimeToken />
            </head>
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
