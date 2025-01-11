// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import PropTypes from 'prop-types';

Myhelmet.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    pathURL: PropTypes.string,
    onetime: PropTypes.boolean,
    robots: PropTypes.string,
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
            const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            setToken(response1.data.data.token);
            setUnique(response1.data.data.unique);
            setCsrf(response2);
            Cookies.set('XSRF-TOKEN', response2, { expires: 1, path: '/', secure: true, sameSite: 'strict' })
            Cookies.set('__token__', token, { expires: 1, path: '/', secure: true, sameSite: 'strict' })
            Cookies.set('__unique__', unique, { expires: 1, path: '/', secure: true, sameSite: 'strict' })
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
                <meta charSet="utf-8" />
                <meta name="description" content="Syafiq Psikotest Online App, adalah aplikasi psikotest berbasis online web, dimana dapat diakses di perangkat manapun, baik untuk admin dan peserta psikotest." />
                <meta property="og:description" content="Syafiq Psikotest Online App, adalah aplikasi psikotest berbasis online web, dimana dapat diakses di perangkat manapun, baik untuk admin dan peserta psikotest." />
                <meta name="keywords" content="Psikotest, Javascript, React.JS, Next.JS, MUI.JS, Material UI, Tailwind, Node.JS, Bun, Million.JS, Chart.JS, SweetAlert2.JS, Axios, Frontend UI/UX" />
                <meta name="author" content="Syafiq. Syahri Ramadhan Wiraasmara (ARI)" />
                <link rel="author" href="https://github.com/ariwiraasmara" />
                <link rel="repository" href="https://github.com/ariwiraasmara/syafiq_psikotest_frontend_nextjs" />
                <link rel="license" href="https://github.com/ariwiraasmara/syafiq_psikotest_frontend_nextjs?tab=AGPL-3.0-1-ov-file#" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:type" content="application, website" />
                <meta property="og:locale" content="id_ID" />
                <meta name="theme-color" content="#323264" />

                {/* Nanti url href diubah dan disesuaikan */}
                <link rel="icon" href="/favicon.ico?favicon.45db1c09.ico" sizes="256x256" type="image/x-icon"></link>
                <link rel="apple-touch-icon" href="/favicon.ico?favicon.45db1c09.ico" />
                <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/favicon.ico?favicon.45db1c09.ico" />
                <meta property="og:image" content="/favicon.ico?favicon.45db1c09.ico" />
            </>
        );
    });

    if(props.onetime) {
        return(
            <head>
                <title>{props.title}</title>
                <meta property="og:title" content={props.title} key="title" />
                <meta name="robots" content={props.robots} />
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
                <link rel="breadcrumb" href={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
                <MemoMeta />
                <meta name="XSRF-TOKEN" content={csrf} />
                <meta name="__token__" content={token} />
                <meta name="__unique__" content={unique} />
            </head>
        );
    }

    return(
        <head>
            <title>{props.title}</title>
            <meta property="og:title" content={props.title} key="title" />
            <meta name="robots" content={props.robots} />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
            <link rel="breadcrumb" href={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
            <MemoMeta />
        </head>
    );
}