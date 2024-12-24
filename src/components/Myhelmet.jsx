// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import * as React from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import { setCookie } from 'cookies-next/client';

export default function Myhelmet(props) {
    const [token, setToken] = React.useState();
    const generateToken = async () => {
        try {
            const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/sanctum/csrf-cookie`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            setToken(response1);
            setCookie('XSRF-TOKEN', token);

            await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/generate-token-first`, {
                withCredentials: true,  // Mengirimkan cookie dalam permintaan
            });
            // localStorage.setItem('ckey', fun.generateKey());
            // console.log('token', response);
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    React.useEffect(() => {
        generateToken();
    }, []);

    return(
        <React.StrictMode>
            <Helmet>
                <meta name="csrf-token" content={token} />
                <meta charset="utf-8" />
                <title>{props.title}</title>
                <meta name="description" content={`Syafiq Psikotest Online App. Adalah aplikasi khusus untuk klien Syafiq berbasis online dan bisa digunakan di perangkat manapun (web based). Sistem ini adalah UI/UX atau Frontend, dimana pengguna dapat mengakses aplikasi berbasis website. ${props.description}`} />
                <meta name="keywords" content="Psikotest, Javascript, React.JS, Next.JS, MUI.JS, Material UI, Tailwind, Node.JS, Bun, Million.JS, Chart.JS, SweetAlert2.JS, Axios, Frontend UI/UX" />
                <meta name="author" content="Syafiq. Syahri Ramadhan Wiraasmara (ARI)" />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND}/${props.pathURL}`} />
                <link rel="repository" href="https://github.com/ariwiraasmara" />
                <link rel="license" href="https://github.com/ariwiraasmara/syafiq_psikotest_frontend_nextjs?tab=AGPL-3.0-1-ov-file#" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
        </React.StrictMode>
    );
}