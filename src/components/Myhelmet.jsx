// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import Head from 'next/head';
// import {Helmet} from "react-helmet";
import axios from 'axios';
import Cookies from 'js-cookie'
import PropTypes from 'prop-types';

Myhelmet.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    pathURL: PropTypes.string
};

export default function Myhelmet(props) {
    const [csrf, setCsrf] = React.useState();
    const [token, setToken] = React.useState();
    const [unique, setUnique] = React.useState();
    const generateToken = async () => {
        try {
            const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/generate-token-first`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            setToken(response1.data.data.token);
            setUnique(response1.data.data.unique);

            const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            setCsrf(response2);
            Cookies.set('XSRF-TOKEN', response2, { expires: 1, path: '/', secure: true, sameSite: 'strict' })
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    React.useEffect(() => {
        if(props.onetime) {
            generateToken();
        }
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    const MemoMeta = React.memo(function Memo(props) {
        return(
            <>
                <meta charset="utf-8" />
                <meta name="description" content={`Syafiq Psikotest Online App. Adalah aplikasi khusus untuk klien Syafiq berbasis online dan bisa digunakan di perangkat manapun (web based). Sistem ini adalah UI/UX atau Frontend, dimana pengguna dapat mengakses aplikasi berbasis website. ${props.description}`} />
                <meta name="keywords" content="Psikotest, Javascript, React.JS, Next.JS, MUI.JS, Material UI, Tailwind, Node.JS, Bun, Million.JS, Chart.JS, SweetAlert2.JS, Axios, Frontend UI/UX" />
                <meta name="author" content="Syafiq. Syahri Ramadhan Wiraasmara (ARI)" />
                <link rel="repository" href="https://github.com/ariwiraasmara" />
                <link rel="license" href="https://github.com/ariwiraasmara/syafiq_psikotest_frontend_nextjs?tab=AGPL-3.0-1-ov-file#" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </>
        );
    });

    if(props.onetime) {
        return(
            <React.StrictMode>
                <Head>
                    <meta name="XSRF-TOKEN" content={csrf} />
                    <meta name="__token__" content={token} />
                    <meta name="__unique__" content={unique} />
                    <title>{props.title}</title>
                    <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
                    <MemoMeta />
                </Head>
            </React.StrictMode>
        );
    }

    return(
        <React.StrictMode>
            <Head>
                <title>{props.title}</title>
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
                <MemoMeta />
            </Head>
        </React.StrictMode>
    );
}